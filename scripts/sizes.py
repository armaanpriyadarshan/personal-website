import os
from PIL import Image

def get_image_info(folder_path):
    image_extensions = ('.jpg', '.jpeg', '.png', '.webp', '.JPG', '.PNG')
    images = []
    for filename in sorted(os.listdir(folder_path)):
        if filename.endswith(image_extensions):
            file_path = os.path.join(folder_path, filename)
            try:
                with Image.open(file_path) as img:
                    width, height = img.size
                images.append({
                    "filename": filename,
                    "width": width,
                    "height": height
                })
            except Exception as e:
                print(f"Could not open {filename}: {e}")
    return images

def print_js_array(images, folder_name='art'):
    print("[")
    for img in images:
        print("  {")
        print(f'    src: "/img/{folder_name}/{img["filename"]}",')
        print(f'    width: {img["width"]},')
        print(f'    height: {img["height"]},')
        print("  },")
    print("]")

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python sizes.py <folder_path>")
        exit(1)
    folder_path = sys.argv[1]
    images = get_image_info(folder_path)
    print_js_array(images, folder_name=os.path.basename(folder_path))