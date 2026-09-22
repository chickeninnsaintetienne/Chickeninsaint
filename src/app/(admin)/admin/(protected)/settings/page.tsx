import { getSettings } from '@/lib/get-settings'
import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { updateSettings } from './actions'

export default async function SettingsPage() {
    // Was a direct supabase.from('settings').select('*').single() call —
    // 'settings' moved to Prisma along with categories/products/offers, and
    // updateSettings (below) already writes through Prisma, so reads need
    // to go through the same client. Reuses the same getSettings() helper
    // the site-facing pages already use.
    const settings = await getSettings()

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight pt-2">Global Settings</h1>

            <Card>
                <CardHeader className="pt-6">
                    <CardTitle>Business Information</CardTitle>
                    <CardDescription>Manage contact details and external links</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={updateSettings} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input name="phone" id="phone" defaultValue={settings?.phone || ''} placeholder="+33 1 23 45 67 89" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input name="address" id="address" defaultValue={settings?.address || ''} placeholder="123 Rue de la Paix" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="hours">Business Hours</Label>
                            <Input name="hours" id="hours" defaultValue={settings?.hours || ''} placeholder="Mon-Sun: 11:00 - 23:00" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="uber_eats_url">UberEats URL</Label>
                                <Input name="uber_eats_url" id="uber_eats_url" defaultValue={settings?.uber_eats_url || ''} placeholder="https://..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="deliveroo_url">Deliveroo URL</Label>
                                <Input name="deliveroo_url" id="deliveroo_url" defaultValue={settings?.deliveroo_url || ''} placeholder="https://..." />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="social_facebook">Facebook URL</Label>
                                <Input name="social_facebook" id="social_facebook" defaultValue={settings?.social_facebook || ''} placeholder="https://facebook.com/..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="social_instagram">Instagram URL</Label>
                                <Input name="social_instagram" id="social_instagram" defaultValue={settings?.social_instagram || ''} placeholder="https://instagram.com/..." />
                            </div>
                        </div>

                        <div className="space-y-2 pt-4 border-t">
                            <Label htmlFor="menu_pdf">Menu PDF</Label>
                            {settings?.menu_pdf_url && (
                                <p className="text-sm text-muted-foreground mb-2">
                                    Current Menu: <a href={settings.menu_pdf_url} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">View PDF</a>
                                </p>
                            )}
                            <Input name="menu_pdf" id="menu_pdf" type="file" accept="application/pdf" />
                            <p className="text-sm text-muted-foreground">Upload a new PDF to replace the current menu.</p>
                        </div>

                        <div className="pt-4">
                            <SubmitButton />
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
