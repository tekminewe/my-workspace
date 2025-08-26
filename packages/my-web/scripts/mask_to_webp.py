#!/usr/bin/env python3
"""
Mask to WebP Converter Script
Converts a black & white mask image to WebP format with proper alpha channel handling.

This script:
1. Loads a black & white mask as grayscale
2. Converts it to RGBA format
3. Uses the mask itself as the alpha channel
4. Saves the result as WebP format

Usage:
    python mask_to_webp.py input_mask.png output_mask.webp
"""

import sys
import os
from PIL import Image
from io import BytesIO

def convert_mask_to_webp(input_path, output_path):
    """
    Convert a black & white mask to WebP format with alpha channel.
    
    Args:
        input_path (str): Path to the input mask image
        output_path (str): Path for the output WebP file
    """
    try:
        print(f"Loading mask from: {input_path}")
        
        # 1. Load the mask as a grayscale image
        mask = Image.open(input_path).convert("L")
        print(f"Original mask size: {mask.size}")
        
        # 2. Convert to RGBA so it has space for an alpha channel
        mask_rgba = mask.convert("RGBA")
        
        # 3. Use the mask itself to fill the alpha channel
        # White areas (255) become fully opaque, black areas (0) become transparent
        mask_rgba.putalpha(mask)
        
        # 4. Save directly as WebP with high quality
        mask_rgba.save(output_path, format="WEBP", quality=100, lossless=True)
        
        print(f"Successfully saved WebP mask to: {output_path}")
        
        # Display some info about the result
        result = Image.open(output_path)
        print(f"Output WebP size: {result.size}")
        print(f"Output WebP mode: {result.mode}")
        print(f"Output file size: {os.path.getsize(output_path)} bytes")
        
        return True
        
    except Exception as e:
        print(f"Error processing mask: {e}")
        return False

def main():
    """Main function to handle command line arguments and execute conversion."""
    
    # Default paths if no arguments provided
    default_input = "/Users/tekminewe/Documents/Github/my-workspace/my-web/public/assets/images/mask.webp"
    default_output = "/Users/tekminewe/Documents/Github/my-workspace/my-web/public/assets/images/mask_alpha.webp"
    
    # Handle command line arguments
    if len(sys.argv) == 1:
        # No arguments - use defaults
        input_path = default_input
        output_path = default_output
        print("No arguments provided, using default paths:")
        print(f"Input: {input_path}")
        print(f"Output: {output_path}")
    elif len(sys.argv) == 3:
        # Both input and output provided
        input_path = sys.argv[1]
        output_path = sys.argv[2]
    else:
        print("Usage:")
        print("  python mask_to_webp.py                           # Use default paths")
        print("  python mask_to_webp.py input.png output.webp     # Specify paths")
        sys.exit(1)
    
    # Check if input file exists
    if not os.path.exists(input_path):
        print(f"Error: Input file not found: {input_path}")
        sys.exit(1)
    
    # Create output directory if it doesn't exist
    output_dir = os.path.dirname(output_path)
    if output_dir and not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"Created output directory: {output_dir}")
    
    # Convert the mask
    success = convert_mask_to_webp(input_path, output_path)
    
    if success:
        print("\n✅ Conversion completed successfully!")
        print(f"Your WebP mask is ready at: {output_path}")
    else:
        print("\n❌ Conversion failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()
