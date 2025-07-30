import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Import the component dynamically to avoid SSR issues
const GitHubCalendar = dynamic(
	() => import('react-github-calendar'),
	{ ssr: false }
);

// Helper function to get date from 12 months ago
const getTwelveMonthsAgo = () => {
	const date = new Date();
	date.setMonth(date.getMonth() - 12);
	return date;
};

interface CommitGraphProps {
	username: string;
	year?: number | 'last';
	colorScheme?: 'light' | 'dark';
	monthsToShow?: number;
}

export const CommitGraph: React.FC<CommitGraphProps> = ({
	username,
	year = 'last',
	colorScheme = 'dark',
	monthsToShow = 12,
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [calendarWidth, setCalendarWidth] = useState(0);
	const [calendarHeight, setCalendarHeight] = useState(0);
	const calendarRef = useRef<HTMLDivElement>(null);
	const outerContainerRef = useRef<HTMLDivElement>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	// Filter to show only contributions from the last 12 months
	const twelveMonthsAgo = getTwelveMonthsAgo();

	// Function to filter contributions to only show the last 12 months
	const transformData = (contributions: Array<{ date: string; count: number; level: number }>) => {
		return contributions.filter(day => {
			const date = new Date(day.date);
			return date >= twelveMonthsAgo;
		});
	};

	// Function to scroll to the most recent part (right side)
	const scrollToMostRecent = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
		}
	};

	// Function to scroll left (backward in time)
	const scrollLeft = () => {
		console.log('Scroll left clicked');
		if (scrollContainerRef.current) {
			console.log('Scrolling left, current scrollLeft:', scrollContainerRef.current.scrollLeft);
			scrollContainerRef.current.scrollLeft -= 200;
		} else {
			console.log('scrollContainerRef.current is null');
		}
	};

	// Function to scroll right (forward in time)
	const scrollRight = () => {
		console.log('Scroll right clicked');
		if (scrollContainerRef.current) {
			console.log('Scrolling right, current scrollLeft:', scrollContainerRef.current.scrollLeft);
			scrollContainerRef.current.scrollLeft += 200;
		} else {
			console.log('scrollContainerRef.current is null');
		}
	};

	// Handle component loading
	useEffect(() => {
		// Set loading to false after component is mounted
		setIsLoading(false);
	}, []);

	// Scroll to most recent after calendar loads
	useEffect(() => {
		if (!isLoading) {
			// Wait a bit for the calendar to render completely
			const timer = setTimeout(() => {
				scrollToMostRecent();
			}, 100);
			return () => clearTimeout(timer);
		}
	}, [isLoading]);

	// Measure the calendar dimensions after it renders
	useEffect(() => {
		if (!isLoading && outerContainerRef.current) {
			// Function to measure and update height
			const measureHeight = () => {
				if (outerContainerRef.current) {
					const rect = outerContainerRef.current.getBoundingClientRect();
					setCalendarWidth(rect.width);
					setCalendarHeight(rect.height);

					// Store height in global state for Discord widget to use
					if (typeof window !== 'undefined') {
						window.githubCalendarHeight = rect.height;
						// Dispatch custom event to notify Discord widget
						window.dispatchEvent(new CustomEvent('githubHeightChange', {
							detail: { height: rect.height }
						}));
						console.log('GitHub calendar outer container height updated:', rect.height);
					}
				}
			};

			// Initial measurement with delay to ensure calendar is rendered
			const initialTimer = setTimeout(measureHeight, 200);

			// Use ResizeObserver to track size changes
			const resizeObserver = new ResizeObserver(entries => {
				for (const entry of entries) {
					measureHeight();
					// Scroll to most recent part after resize
					setTimeout(() => {
						scrollToMostRecent();
					}, 50);
				}
			});

			resizeObserver.observe(outerContainerRef.current);

			// Also measure on window resize
			const handleWindowResize = () => {
				setTimeout(measureHeight, 100);
			};
			window.addEventListener('resize', handleWindowResize);

			return () => {
				clearTimeout(initialTimer);
				resizeObserver.disconnect();
				window.removeEventListener('resize', handleWindowResize);
			};
		}
	}, [isLoading]);

	return (
		<div ref={outerContainerRef} className="w-full py-4 flex justify-center">
			<div
				ref={calendarRef}
				className="relative w-full"
				style={{
					// Center the calendar container
					margin: '0 auto'
				}}
			>
				{isLoading ? (
					<div className="flex justify-center items-center h-32">
						<div className="animate-pulse text-gray-400">Loading contribution data...</div>
					</div>
				) : (
					<>
						{/* Left Arrow */}
						<button
							onClick={scrollLeft}
							className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm border border-white/20 shadow-lg"
							aria-label="Scroll backward in time"
							type="button"
						>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</button>

						{/* Right Arrow */}
						<button
							onClick={scrollRight}
							className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm border border-white/20 shadow-lg"
							aria-label="Scroll forward in time"
							type="button"
						>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</button>

						<div
							ref={scrollContainerRef}
							className="overflow-x-auto w-full"
							style={{
								scrollBehavior: 'smooth'
							}}
						>
							<div
								style={{
									backgroundColor: 'rgba(255, 255, 255, 0.05)',
									borderRadius: '50px',
									borderColor: 'rgba(255, 255, 255, 0.05)',
									borderWidth: '1.5px',
									width: '100%',
									minWidth: '800px', // Ensure content is wide enough to scroll
									maxWidth: '100%'
								}}
								className="p-4 shadow-[0_0_10px_#0000001a]"
							>
								<GitHubCalendar
									username={username}
									year={year}
									blockSize={12}
									blockMargin={4}
									fontSize={12}
									colorScheme={colorScheme}
									theme={{
										light: ['#ebedf0', '#39d353'],
										dark: ['#161b22', '#39d353']
									}}
									transformData={transformData}
									hideMonthLabels={false}
									labels={{
										totalCount: `{{count}} contributions in the last ${monthsToShow} months`,
									}}
									errorMessage="Failed to load GitHub contribution data"
								/>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default CommitGraph;