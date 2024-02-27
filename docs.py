from typing import Dict, List
import glob
import json
import os.path


def compact(path: str, output: str):
    '''
    Compacts and saves Markdown files into a JSON file.
    Parameters:
        - path (str): Path to the directory containing the Markdown files.
        - output (str): Path to the output JSON file.
    Processing Logic:
        - Gets all Markdown files in the specified directory.
        - Reads the content of each file and saves it in a dictionary.
        - Saves the dictionary as a JSON file.
    '''
    data: Dict[str, str] = {}

    print('Getting docs...', end='')
    docs: List[str] = glob.glob(os.path.join(path, '*.md'))
    print(' Done')

    print('Layouting docs...', end='')
    for doc in docs:
        name = os.path.basename(doc)
        with open(doc, 'r', encoding='utf-8') as f:
            content = f.read()
            data[name[:-3]] = content
    print(' Done')

    print('Saving docs...', end='')
    with open(output, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)
    print(' Done')

    print('Success !')


if __name__ == '__main__':
    compact('docs', 'data.json')
