import re
import os


def format_content(content):
    # First, remove all extra newlines
    content = re.sub(r"\n+", "\n", content)

    # Format chapter titles: add a single newline after them
    content = re.sub(r"(#+ .+)\n", r"\1\n\n", content)

    # Then, add a single newline after each verse
    pattern = r"(\d+:\d+.*?)\n"
    formatted_content = re.sub(pattern, r"\1\n\n", content, flags=re.DOTALL)

    # Remove any potential triple newlines that might have been created
    formatted_content = re.sub(r"\n{3,}", "\n\n", formatted_content)

    return formatted_content


def process_file(input_file, output_file):
    try:
        with open(input_file, "r", encoding="utf-8") as file:
            content = file.read()

        formatted_content = format_content(content)

        with open(output_file, "w", encoding="utf-8") as file:
            file.write(formatted_content)

        print(f"Formatted: {input_file} -> {output_file}")
    except Exception as e:
        print(f"Error processing {input_file}: {e}")


def process_directory(directory):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    input_dir = os.path.join(script_dir, directory)
    output_dir = os.path.join(script_dir, f"{directory}_formatted")

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for filename in os.listdir(input_dir):
        if filename.endswith((".md", ".mdx")):
            input_file = os.path.join(input_dir, filename)
            output_file = os.path.join(output_dir, filename)
            process_file(input_file, output_file)


if __name__ == "__main__":
    process_directory("documents_to_format")
    print(
        "Processing completed. Check the 'documents_to_format_formatted' directory for results."
    )
