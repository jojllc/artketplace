"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"

const artworkSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description must be less than 1000 characters"),
  price: z.number().min(1, "Price must be greater than 0").max(1000000, "Price must be reasonable"),
  image_url: z.string().url("Please provide a valid image URL").optional().or(z.literal("")),
})

type ArtworkFormData = z.infer<typeof artworkSchema>

export default function NewListingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")

  const form = useForm<ArtworkFormData>({
    resolver: zodResolver(artworkSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      image_url: "",
    },
  })

  // Handle image URL input and preview
  const handleImageUrlChange = (url: string) => {
    setImagePreview(url)
    form.setValue("image_url", url)
  }

  const onSubmit = async (data: ArtworkFormData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to list artwork",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      console.log('Submitting artwork data:', {
        title: data.title,
        description: data.description,
        price: data.price,
        image_url: data.image_url || null,
        artist_id: user.id,
      })

      // Insert new artwork into Supabase
      const { data: artwork, error } = await supabase
        .from('artworks')
        .insert([
          {
            title: data.title,
            description: data.description,
            price: data.price,
            image_url: data.image_url || null,
            artist_id: user.id, // Use the authenticated user's ID
          }
        ])
        .select()

      console.log('Supabase response:', { artwork, error })

      if (error) {
        console.error('Supabase error details:', error)
        throw new Error(`Database error: ${error.message}`)
      }

      if (!artwork || artwork.length === 0) {
        throw new Error('No artwork data returned from database')
      }

      console.log('Artwork created successfully:', artwork)
      
      toast({
        title: "Artwork listed successfully!",
        description: "Your artwork is now live on the marketplace",
      })
      
      // Redirect back to selling page
      router.push('/selling')
    } catch (error: any) {
      console.error('Full error details:', error)
      toast({
        title: "Error creating listing",
        description: error.message || "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show login message if user is not authenticated
  if (!user) {
    return (
      <div className="container max-w-2xl py-8">
        <Link href="/selling" className="inline-flex items-center text-sm mb-6 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to selling
        </Link>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Authentication Required</h2>
              <p className="text-muted-foreground">
                Please log in to list your artwork on the marketplace.
              </p>
              <Link href="/auth">
                <Button>Go to Login</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-8">
      <Link href="/selling" className="inline-flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to selling
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">List New Artwork</h1>
        <p className="text-muted-foreground mt-2">
          Create a new listing to sell your artwork on the marketplace
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Image Preview Section */}
          <Card>
            <CardHeader>
              <CardTitle>Artwork Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/your-artwork-image.jpg"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          handleImageUrlChange(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Artwork preview"
                    className="w-full max-w-md h-64 object-cover rounded-lg border"
                    onError={() => setImagePreview("")}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setImagePreview("")
                      form.setValue("image_url", "")
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              <p className="text-sm text-muted-foreground">
                Provide a direct URL to your artwork image. Make sure the image is publicly accessible.
              </p>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Artwork Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter artwork title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your artwork, inspiration, technique, materials used, etc."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter price in USD"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Submit Section */}
          <div className="flex gap-4">
            <Link href="/selling">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Creating Listing..." : "List Artwork"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
