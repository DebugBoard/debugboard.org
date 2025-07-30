# Projects Configuration

This file allows you to configure which projects should be hidden from the projects page.

## Configuration

Edit the `config/projects.json` file to specify which repositories should be hidden:

```json
{
  "hiddenProjects": [
    "repository-name-1",
    "repository-name-2",
    "another-repo-to-hide"
  ]
}
```

## Usage

1. Add the exact repository name (not the full name with username) to the `hiddenProjects` array
2. Save the file
3. The development server will automatically reload and apply the changes
4. Hidden repositories will no longer appear on the projects page

## Example

To hide repositories named "test-repo" and "old-project":

```json
{
  "hiddenProjects": [
    "test-repo",
    "old-project"
  ]
}
```

## Notes

- Repository names are case-sensitive
- If the config file is missing or malformed, all repositories will be shown (except those filtered by other criteria)
- The configuration only affects the display on the projects page, not the actual repositories