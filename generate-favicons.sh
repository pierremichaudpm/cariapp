#!/bin/bash

# Generate favicon files from SVG
# This script requires ImageMagick to be installed

set -e  # Exit on error

echo "Generating favicon files from SVG..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick is not installed."
    echo "Install it with: sudo apt-get install imagemagick (Ubuntu/Debian)"
    echo "Or: brew install imagemagick (macOS)"
    exit 1
fi

# Check if SVG file exists
SVG_FILE="public/favicon.svg"
if [ ! -f "$SVG_FILE" ]; then
    echo "Error: $SVG_FILE not found."
    exit 1
fi

# Create output directory if it doesn't exist
mkdir -p public

echo "1. Generating ICO file (multiple sizes)..."
convert -background none "$SVG_FILE" -define icon:auto-resize=16,32,48,64 "public/favicon.ico"

echo "2. Generating PNG files..."
# Standard favicon sizes
convert -background none "$SVG_FILE" -resize 16x16 "public/favicon-16x16.png"
convert -background none "$SVG_FILE" -resize 32x32 "public/favicon-32x32.png"
convert -background none "$SVG_FILE" -resize 48x48 "public/favicon-48x48.png"

# Modern browser/app sizes
convert -background none "$SVG_FILE" -resize 192x192 "public/android-chrome-192x192.png"
convert -background none "$SVG_FILE" -resize 512x512 "public/android-chrome-512x512.png"

# Apple touch icons
convert -background none "$SVG_FILE" -resize 180x180 "public/apple-touch-icon.png"
convert -background none "$SVG_FILE" -resize 152x152 "public/apple-touch-icon-152x152.png"
convert -background none "$SVG_FILE" -resize 120x120 "public/apple-touch-icon-120x120.png"

# General purpose PNG (for backward compatibility)
convert -background none "$SVG_FILE" -resize 512x512 "public/favicon.png"

echo "3. Creating optimized versions..."
# Create optimized versions with better quality
for size in 16 32 48 64 120 152 180 192 512; do
    if [ -f "public/favicon-${size}x${size}.png" ] || [ -f "public/android-chrome-${size}x${size}.png" ] || [ -f "public/apple-touch-icon-${size}x${size}.png" ]; then
        echo "  Optimizing ${size}x${size}..."
        # Find the file
        if [ $size -eq 16 ] || [ $size -eq 32 ] || [ $size -eq 48 ]; then
            file="public/favicon-${size}x${size}.png"
        elif [ $size -eq 192 ] || [ $size -eq 512 ]; then
            file="public/android-chrome-${size}x${size}.png"
        elif [ $size -eq 180 ] || [ $size -eq 152 ] || [ $size -eq 120 ]; then
            file="public/apple-touch-icon"
            if [ $size -ne 180 ]; then
                file="${file}-${size}x${size}.png"
            else
                file="${file}.png"
            fi
        fi

        if [ -f "$file" ]; then
            # Optimize PNG (optional - requires optipng)
            if command -v optipng &> /dev/null; then
                optipng -quiet -o2 "$file"
            fi
        fi
    fi
done

echo "4. Creating site.webmanifest for better PWA support..."
cat > public/site.webmanifest << EOF
{
  "name": "CARI St-Laurent",
  "short_name": "CARI",
  "description": "Centre d'Accueil et de Référence pour Immigrants",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png"
    }
  ],
  "theme_color": "#6CBAC7",
  "background_color": "#ffffff",
  "display": "standalone",
  "scope": "/",
  "start_url": "/"
}
EOF

echo "5. Cleaning up old favicon files..."
# Remove the old favicon.png if it exists (the one with logo)
if [ -f "public/favicon.png" ] && [ $(stat -c%s "public/favicon.png") -eq 78598 ]; then
    echo "  Removing old favicon.png..."
    rm "public/favicon.png"
    # Use the new one we just created
    cp "public/android-chrome-512x512.png" "public/favicon.png"
fi

echo "6. Verifying files..."
echo "Generated files:"
ls -la public/favicon* public/android-chrome* public/apple-touch-icon* 2>/dev/null | grep -E "\.(ico|png|svg)$"

echo ""
echo "✅ Favicon generation complete!"
echo ""
echo "Next steps:"
echo "1. Commit the generated files to Git:"
echo "   git add public/favicon* public/android-chrome* public/apple-touch-icon* public/site.webmanifest"
echo "2. Update your HTML if needed (already done in index.html)"
echo "3. Test the favicon in different browsers"
echo ""
echo "Note: The favicon uses a simple house design with CARI's brand colors"
echo "      (#6CBAC7 and #4A8C9A) to represent 'home/welcome'."
