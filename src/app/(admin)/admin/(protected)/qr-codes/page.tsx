'use client'

import { useState } from 'react'
import QRCode from 'qrcode'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2, Download } from 'lucide-react'
import Image from 'next/image'

export default function QrCodesPage() {
    const [type, setType] = useState('custom')
    const [url, setUrl] = useState('')
    const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
    const [generating, setGenerating] = useState(false)

    // Helper to handle URL presets
    const handleTypeChange = (value: string) => {
        setType(value)
        const baseUrl = window.location.origin
        switch (value) {
            case 'home':
                setUrl(baseUrl + '/')
                break
            case 'menu':
                setUrl(baseUrl + '/menu')
                break
            case 'offers':
                setUrl(baseUrl + '/offers')
                break
            case 'custom':
                setUrl('')
                break
            default:
                break
        }
    }

    const generateCode = async () => {
        if (!url) {
            toast.error('Please enter a URL')
            return
        }
        try {
            setGenerating(true)
            const dataUrl = await QRCode.toDataURL(url, {
                width: 400,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#ffffff',
                },
            })
            setQrDataUrl(dataUrl)
            toast.success('QR Code generated')
        } catch (err) {
            toast.error('Failed to generate QR Code')
        } finally {
            setGenerating(false)
        }
    }

    const downloadCode = () => {
        if (!qrDataUrl) return
        const link = document.createElement('a')
        link.download = `qrcode-${type}.png`
        link.href = qrDataUrl
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight pt-2">QR Code Generator</h1>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader className="pt-6">
                        <CardTitle>Configuration</CardTitle>
                        <CardDescription>Select a preset or enter a custom URL</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Type</Label>
                            <Select value={type} onValueChange={handleTypeChange}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="home">Home Page</SelectItem>
                                    <SelectItem value="menu">Menu Page</SelectItem>
                                    <SelectItem value="offers">Offers Page</SelectItem>
                                    <SelectItem value="custom">Custom URL</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Target URL</Label>
                            <Input
                                value={url}
                                onChange={(e) => {
                                    setUrl(e.target.value)
                                    if (type !== 'custom') setType('custom')
                                }}
                                placeholder="https://..."
                            />
                        </div>

                        <Button onClick={generateCode} disabled={generating || !url} className="w-full">
                            {generating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Generate QR Code'}
                        </Button>
                    </CardContent>
                </Card>

                <Card className="flex flex-col items-center justify-center min-h-[300px]">
                    <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                        {qrDataUrl ? (
                            <>
                                <div className="border p-2 rounded-lg bg-white shadow-sm">
                                    <Image src={qrDataUrl} width={250} height={250} alt="QR Code" />
                                </div>
                                <Button onClick={downloadCode}>
                                    <Download className="mr-2 h-4 w-4" /> Download
                                </Button>
                            </>
                        ) : (
                            <div className="text-center text-gray-400">
                                <p>Generate a code to see preview</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
