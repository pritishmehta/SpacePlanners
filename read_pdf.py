import sys
try:
    import pypdf
except ImportError:
    import os
    os.system("pip install pypdf")
    import pypdf

def extract_pdf_text(filepath):
    text = ""
    with open(filepath, "rb") as f:
        reader = pypdf.PdfReader(f)
        for i, page in enumerate(reader.pages):
            text += f"\n--- Page {i+1} ---\n"
            text += page.extract_text()
    
    with open("pdf_extracted_text.txt", "w", encoding="utf-8") as out:
        out.write(text)
    print("Successfully extracted PDF text to pdf_extracted_text.txt")

if __name__ == "__main__":
    extract_pdf_text("FINAL SPACE PLANNERS product portfolio 270126 (1).pdf")
