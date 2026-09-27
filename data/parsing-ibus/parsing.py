from typing import TypedDict


class CodesDict(TypedDict):
    codesToWord: dict[str, str]
    wordsToCode: dict[str, str]


class ParsingException(Exception):
    pass


def getCommonWords() -> list[str]:
    commonWords: list[str] = []
    with open(
        "../common_words/common_words.txt", "r", encoding="utf-8"
    ) as commonWordsFile:
        lines = commonWordsFile.readlines()

        for line in lines:
            splittedLine = line.strip().split("\t")
            if len(splittedLine) > 2:
                commonWords.append(splittedLine[2])

        return commonWords


def getCodes(filePath: str) -> CodesDict:
    codes: CodesDict = {
        "codesToWord": {},
        "wordsToCode": {},
    }

    with open(filePath, "r", encoding="utf-8") as codesFile:
        lines = codesFile.readlines()

        count = 0

        for line in lines:
            splittedLine = line.strip().split("\t")

            if len(splittedLine) < 2:
                continue

            # For letters to words mapping, only the first 25 lines are letters
            if count < 25:
                codes["codesToWord"][splittedLine[0]] = splittedLine[1]

            # For the specific case where 'x' is mapped to '難'
            if splittedLine[0] == "x" and splittedLine[1] == "難":
                continue

            current_code = splittedLine[0]
            current_word = splittedLine[1]
            existing_code = codes["wordsToCode"].get(current_word)

            is_current_code_shorter = existing_code and current_code in existing_code
            # Try not to alter the existing mapping if the word is already mapped
            # There are some words with multiple codes, so we try not to override
            # the existing code with a less common one. Especially for the words
            # that have an extra code starting with 'x'. However, if the new code is
            # a substring of the old code, use the new code because that is better.
            if existing_code == None or is_current_code_shorter:
                codes["wordsToCode"][current_word] = current_code

            count += 1

    return codes


def getAnswerFromEnglishKey(codes: CodesDict, key: str):
    answer = ""
    for k in key:
        if k in codes["codesToWord"]:
            answer += codes["codesToWord"][k]
        else:
            raise ParsingException("Key not found: " + k)

    return answer


def outputCodes(fileName: str, commonWords: list[str], codes: CodesDict):
    output = "["

    for index, word in enumerate(commonWords):
        if word in codes["wordsToCode"]:
            englishKeyLower = codes["wordsToCode"][word]
            englishKey = englishKeyLower.upper()
            answer = getAnswerFromEnglishKey(codes, englishKeyLower)

            if index > 0:
                output += ","

            output += (
                " ( "
                + str(index)
                + ", { id = "
                + str(index)
                + ', target = "'
                + word
                + '", answer = "'
                + answer
                + '", englishKey = "'
                + englishKey
                + '" } )\n'
            )

            # print(index, word, answer, englishKey)
        else:
            raise ParsingException(word + "\t" + "not found")

    output += "]\n"

    with open(fileName, "w") as outputFile:
        _ = outputFile.write(output)


def main():
    commonWords = getCommonWords()
    codes = getCodes("../ibus-table/cangjie5-clean.txt")

    # print(getAnswerFromEnglishKey(codes, 'kejf'))
    # print(codes['codesToWord'])

    outputCodes("dataset-common.txt", commonWords, codes)


if __name__ == "__main__":
    main()
