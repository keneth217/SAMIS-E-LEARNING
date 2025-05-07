import { ref, onMounted } from 'vue'

export type Theme = 'light' | 'dark' | 'system'

interface ThemeOption {
    id: Theme
    name: string
}





export default function useTheme() {
    const theme = ref<Theme>('system')
    const isDark = ref<boolean>(false)

    // Available theme options
    const themes: ThemeOption[] = [
        { id: 'light', name: 'Light' },
        { id: 'dark', name: 'Dark' },
        { id: 'system', name: 'System' }
    ]

    // Set theme class on document element
    const applyTheme = (newTheme: Theme): void => {
        // Remove all theme classes first
        document.documentElement.classList.remove('light', 'dark')

        if (newTheme === 'system') {
            // Use system preference
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            document.documentElement.classList.add(systemPrefersDark ? 'dark' : 'light')
            isDark.value = systemPrefersDark
        } else {
            // Use selected theme
            document.documentElement.classList.add(newTheme)
            isDark.value = newTheme === 'dark'
        }
    }

    // Initialize theme from localStorage or system preference
    const initTheme = (): void => {
        const savedTheme = localStorage.getItem('theme') as Theme | null
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
            theme.value = savedTheme
        } else {
            theme.value = 'system'
        }
        applyTheme(theme.value)
    }

    // Watch for system preference changes when theme is 'system'
    const watchSystemPreference = (): (() => void) => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const listener = (e: MediaQueryListEvent): void => {
            if (theme.value === 'system') {
                applyTheme('system')
            }
        }
        mediaQuery.addEventListener('change', listener)
        return () => mediaQuery.removeEventListener('change', listener)
    }

    // Set a new theme
    const setTheme = (newTheme: Theme): void => {
        theme.value = newTheme
        localStorage.setItem('theme', newTheme)
        applyTheme(newTheme)
    }

    // Initialize on mount
    onMounted(() => {
        initTheme()
        const cleanup = watchSystemPreference()

        // Cleanup the event listener when the component unmounts
        return () => cleanup()
    })

    return {
        theme,
        isDark,
        themes,
        setTheme
    }
}