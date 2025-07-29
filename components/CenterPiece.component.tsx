export default function CenterPiece() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          @font-face {
            font-family: 'Minecraft';
            src: url('/minecraft_font.woff2') format('woff2'),
                 url('/minecraft_font.woff') format('woff'),
                 url('/minecraft_font.ttf') format('truetype'),
                 url('/minecraft_font.otf') format('opentype'),
                 url('/minecraft_font.eot') format('embedded-opentype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
          *::selection {
            background-color: #6b0000;
          }
          ::-webkit-scrollbar {
            display: none;
          }
        `
      }} />

      <div className="flex w-full flex-col items-center justify-center relative z-10" style={{ maxWidth: '505px' }}>
        <div
          style={{
            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
            WebkitBackdropFilter: 'blur(50px)',
            backdropFilter: 'blur(50px)',
            borderRadius: '50px',
            borderColor: 'rgba(66, 66, 66, 0.25)',
            borderWidth: '1.5px'
          }}
          className="relative h-fit w-full z-50 mt-12"
        >
          {/* Profile Picture - positioned relative to the card */}
          <div className="absolute -top-[60px] left-0 right-0 z-[100] flex items-center justify-center">
            <img
              alt="Profile Image"
              loading="eager"
              width="120"
              height="120"
              decoding="async"
              className="w-[120px] h-[120px] rounded-[40px] object-cover shadow-xl"
              style={{
                color: 'transparent'
              }}
              src="/images/pfp.gif"
            />
          </div>
          <div className="relative w-full flex-col items-center justify-center p-6 pt-20">

            <div className="relative mx-auto flex w-fit flex-col items-center gap-1">
              <div className="group relative z-10 w-fit">
                <div className="relative">
                  <h2
                    className="relative w-fit text-wrap break-all bg-transparent text-[28px] font-medium tracking-wider"
                    style={{
                      color: '#610000',
                      fontFamily: 'Minecraft, monospace',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}
                    data-text="DebugBoard"
                  >
                    DebugBoard
                  </h2>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '50px',
                borderColor: 'rgba(255, 255, 255, 0.05)',
                borderWidth: '1.5px'
              }}
              className="mt-[15px] w-full p-4 shadow-[0_0_10px_#0000001a]"
            >
              <div className="mx-auto flex w-full flex-wrap items-center justify-center gap-4">
                {/* NameMC */}
                <div className="group relative z-10 w-fit">
                  <button onClick={() => window.location.href = 'https://NameMC.com/profile/DebugBoard.1?'}>
                    <div>
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" className="duration-300 hover:scale-110" style={{ color: '#6b0000' }} height="45" width="45" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0v24h24V0Zm4.8 4.8H16V8h3.2v11.2H16V8H8v11.2H4.8V8Z"></path>
                      </svg>
                    </div>
                  </button>
                </div>

                {/* GitHub */}
                <div className="group relative z-10 w-fit">
                  <button onClick={() => window.location.href = 'https://github.com/DebugBoard'}>
                    <div>
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" className="duration-300 hover:scale-110" style={{ color: '#6b0000' }} height="45" width="45" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                      </svg>
                    </div>
                  </button>
                </div>

                {/* Discord */}
                <div className="group relative z-10 w-fit">
                  <button onClick={() => window.location.href = 'https://discord.com/users/993915202376572939'}>
                    <div>
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" className="duration-300 hover:scale-110" style={{ color: '#6b0000' }} height="45" width="45" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
                      </svg>
                    </div>
                  </button>
                </div>

                {/* Reddit */}
                <div className="group relative z-10 w-fit">
                  <button onClick={() => window.location.href = 'https://www.reddit.com/user/WesternImpression394/'}>
                    <div>
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" className="duration-300 hover:scale-110" style={{ color: '#6b0000' }} height="45" width="45" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539v.002c-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z"></path>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}