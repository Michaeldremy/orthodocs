import re
import sys
import os


def format_chapter_heading(match):
    chapter_num = match.group(1)
    title = match.group(2).lower().rstrip(".")
    # Capitalize the first letter of the title
    title = title[0].upper() + title[1:]
    return f"### Chapter {chapter_num}: {title}"


def process_markdown_file(input_file_path):
    with open(input_file_path, "r", encoding="utf-8") as file:
        content = file.read()

    pattern = r"### Chapter ([IVXivx\d]+): (.*)"
    modified_content = re.sub(pattern, format_chapter_heading, content)

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
