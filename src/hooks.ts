import { useEffect, useState } from 'react'
import { breakpoints } from './styles/variables'

// https://usehooks.com/useWindowSize/
type WindowSize = {
  width: number | undefined
  height: number | undefined
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  })
  useEffect(() => {
    function handleResize(): void {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}

type Breakpoints = {
  [K in `is${Capitalize<keyof typeof breakpoints | 'desktop'>}`]: boolean
}

export function useBreakpoint(): Breakpoints {
  const { width } = useWindowSize()

  function getBreakpoints(): Breakpoints {
    const current =
      typeof width === 'number' && width <= breakpoints.mobile
        ? 'mobile'
        : typeof width === 'number' && width <= breakpoints.tablet
        ? 'tablet'
        : 'desktop'

    return {
      isMobile: current === 'mobile',
      isTablet: current === 'tablet',
      isDesktop: current === 'desktop',
    }
  }

  const [state, setState] = useState(getBreakpoints())

  useEffect(() => {
    setState(getBreakpoints())
  }, [width])

  return state
}
