import re
import sys
import os

# List of words to always capitalize
SPECIAL_WORDS = [
    "plato",
    "plato's",
    "god",
    "christ",
    "jesus",
    "socrates",
    "aristotle",
    "zeus",
    "christians",
    "moses",
    "christ's",
    "abraham",
    "daniel",
    "justin",
    "hezekiah",
    "catholics",
    "catholic",
    "psalms",
    "jews",
    "jewish",
    "noah",
    "isaac",
    "jacob",
    "judah",
    "zechariah",
    "joshua",
    "micah",
    "jonah",
    "psalm",
    "eucharist",
    "judaea",
]


def capitalize_special_words(title):
    words = re.findall(r"\b[\w']+\b", title)
    capitalized_words = [
        word.capitalize() if word.lower() in SPECIAL_WORDS else word for word in words
    ]
    return " ".join(capitalized_words)


def format_chapter_heading(match):
    if match.group(1):  # If it's the new format "CHAPTER LXIV -- TITLE"
        chapter_num = match.group(2)
        title = match.group(3).lower().rstrip(".")
    else:  # If it's the old format "Chapter LXIV: TITLE"
        chapter_num = match.group(4)
        title = match.group(5).lower().rstrip(".")

    # Capitalize the first letter of the title and special words
    title = title[0].upper() + title[1:]
    title = capitalize_special_words(title)
    return f"### Chapter {chapter_num}: {title}"


def process_markdown_file(input_file_path):
    with open(input_file_path, "r", encoding="utf-8") as file:
        content = file.read()

    # Pattern to match both "CHAPTER LXIV -- TITLE" and "Chapter LXIV: TITLE" formats
    pattern = r"(CHAPTER ([IVXLCDM]+) -- (.+))|(### Chapter ([IVXivxLCDM\d]+): (.+))"
    modified_content = re.sub(
        pattern, format_chapter_heading, content, flags=re.IGNORECASE
    )

    file_name, file_extension = os.path.splitext(input_file_path)
    output_file_path = f"{file_name}_formatted{file_extension}"

    with open(output_file_path, "w", encoding="utf-8") as file:
        file.write(modified_content)

    return output_file_path


def process_directory(directory_path):
    processed_files = []
    for filename in os.listdir(directory_path):
        if filename.endswith(".mdx"):
            file_path = os.path.join(directory_path, filename)
            output_file = process_markdown_file(file_path)
            processed_files.append((filename, output_file))
    return processed_files


if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    documents_dir = os.path.join(script_dir, "documents_to_format")

    if not os.path.exists(documents_dir):
        print(f"Error: 'documents_to_format' directory not found in {script_dir}")
        sys.exit(1)

    processed_files = process_directory(documents_dir)

    if processed_files:
        print("Processed files:")
        for original, formatted in processed_files:
            print(f"  {original} -> {os.path.basename(formatted)}")
    else:
        print("No .mdx files found to process.")
