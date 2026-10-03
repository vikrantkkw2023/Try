# SafeHer UI Design System

## Colours
- **Primary (Violet):** #5B3FD1 for buttons, links and key actions
- **Safe (Green):** #0F6B52 for success states and safe actions
- **Danger (Red):** #E5484D for SOS and alerts
- **Background:** #F6F2FF soft lavender
- **High contrast mode:** available in settings

## Components
Use the components from `src/ui.tsx`:
- `Btn` for buttons (kind: primary, outline, danger, safe, ghost)
- `Card` for content boxes
- `Notice` for alerts (tone: safe, warn)
- `Screen` for full-screen layouts
- `Txt` for all text

## Theme
The app automatically applies the chosen theme. Access it with `useTheme()` in any component.
