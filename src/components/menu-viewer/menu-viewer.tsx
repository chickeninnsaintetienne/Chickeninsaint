'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './menu-viewer.module.css'

// Menu pages live in /public/menu as page-1.webp, page-2.webp, ...
// Change MENU_PAGE_COUNT to match the number of images you put there.
const MENU_PAGE_COUNT = 4
const MENU_IMAGES = Array.from(
    { length: MENU_PAGE_COUNT },
    (_, i) => `/menu/page-${i + 1}.webp`
)

const MIN_ZOOM = 0.5
const MAX_ZOOM = 2.5

export function MenuViewer() {
    const [zoom, setZoom] = useState(1)
    const zoomRef = useRef(1)
    const viewerRef = useRef<HTMLDivElement>(null)
    // Scroll position to restore after a zoom change (keeps the screen centre fixed)
    const centerRef = useRef<{ cx: number; cy: number } | null>(null)

    const applyZoom = useCallback((next: number) => {
        next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(next * 100) / 100))
        if (next === zoomRef.current) return
        const v = viewerRef.current
        if (v) {
            centerRef.current = {
                cx: (v.scrollLeft + v.clientWidth / 2) / v.scrollWidth,
                cy: (v.scrollTop + v.clientHeight / 2) / v.scrollHeight,
            }
        }
        zoomRef.current = next
        setZoom(next)
    }, [])

    const changeZoom = useCallback(
        (amount: number) => applyZoom(zoomRef.current + amount),
        [applyZoom]
    )
    const resetZoom = useCallback(() => applyZoom(1), [applyZoom])

    // After the new zoom is rendered, put the previous centre back in the middle
    useEffect(() => {
        const v = viewerRef.current
        const c = centerRef.current
        if (!v || !c) return
        v.scrollLeft = c.cx * v.scrollWidth - v.clientWidth / 2
        v.scrollTop = c.cy * v.scrollHeight - v.clientHeight / 2
        centerRef.current = null
    }, [zoom])

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === '+' || e.key === '=') changeZoom(0.1)
            if (e.key === '-') changeZoom(-0.1)
            if (e.key === '0') resetZoom()
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [changeZoom, resetZoom])

    // The viewer scrolls by itself, so stop the site behind it from scrolling
    useEffect(() => {
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = prev
        }
    }, [])

    return (
        <div className={styles.root}>
            <div className={styles.zoom} role="group" aria-label="Zoom">
                <button type="button" onClick={() => changeZoom(-0.1)} aria-label="Zoom out">−</button>
                <button type="button" className={styles.value} onClick={resetZoom} aria-label="Reset zoom">
                    {Math.round(zoom * 100)}%
                </button>
                <button type="button" onClick={() => changeZoom(0.1)} aria-label="Zoom in">+</button>
                <button type="button" className={styles.reset} onClick={resetZoom}>Reset</button>
            </div>

            <div className={styles.viewer} ref={viewerRef}>
                <main
                    className={styles.menu}
                    style={{ '--zoom': zoom } as React.CSSProperties}
                >
                    {MENU_IMAGES.map((src, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={src} src={src} alt={`Menu page ${i + 1}`} />
                    ))}
                </main>
            </div>
        </div>
    )
}
