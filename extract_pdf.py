import PyPDF2
import os

pdf_path = r"C:\Users\priti\Downloads\FINAL SPACE PLANNERS product portfolio 270126.pdf"

try:
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for i, page in enumerate(reader.pages):
            text += f"--- Page {i+1} ---\n"
            text += page.extract_text() + "\n\n"
            
    with open('pdf_extracted.txt', 'w', encoding='utf-8') as out:
        out.write(text)
    print("Successfully extracted PDF text to pdf_extracted.txt")
except Exception as e:
    print(f"Error reading PDF with PyPDF2: {e}")
    print("Trying pdfplumber if available...")
    try:
        import pdfplumber
        with pdfplumber.open(pdf_path) as pdf:
            text = ""
            for i, page in enumerate(pdf.pages):
                text += f"--- Page {i+1} ---\n"
                text += page.extract_text() + "\n\n"
        with open('pdf_extracted.txt', 'w', encoding='utf-8') as out:
            out.write(text)
        print("Successfully extracted with pdfplumber")
    except Exception as e2:
        print(f"Error with pdfplumber: {e2}")
