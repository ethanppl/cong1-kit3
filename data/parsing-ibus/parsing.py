def getCommonWords():
    commonWords = []
    commonWordsFile = open('../common_words/common_words.txt', 'r', encoding='utf-8')
    Lines = commonWordsFile.readlines()

    for line in Lines:
        splittedLine = line.strip().split('\t')
        if len(splittedLine) > 2:
            commonWords.append(splittedLine[2])

    return commonWords

def getCodes(filePath):
    codes = {}
    codes['codesToWord'] = {}
    codes['wordsToCode'] = {}

    codesFile = open(filePath, 'r', encoding='utf-8')
    lines = codesFile.readlines()

    count = 0

    for line in lines:
        splittedLine = line.strip().split('\t')

        if len(splittedLine) < 2:
            continue

        # For letters to words mapping, only the first 25 lines are letters
        if count < 25:
            codes['codesToWord'][splittedLine[0]] = splittedLine[1]

        # For the specific case where 'x' is mapped to '難'
        if splittedLine[0] == 'x' and splittedLine[1] == '難':
            continue
        
        # Try not to alter the existing mapping if the word is already mapped
        # There are some words with multiple codes, so we try not to override
        # the existing code with a less common one. Especially for the words
        # that have an extra code starting with 'x'.
        if not splittedLine[1] in codes['wordsToCode']:
            codes['wordsToCode'][splittedLine[1]] = splittedLine[0]

        count += 1

    return codes

def getAnswerFromEnglishKey(codes, key):
    answer = ''
    for k in key:
        if k in codes['codesToWord']:
            answer += codes['codesToWord'][k]
        else:
            raise Exception('Key not found: ' + k)
    
    return answer

commonWords = getCommonWords()
codes = getCodes('../ibus-table/cangjie5-clean.txt')

# print(getAnswerFromEnglishKey(codes, 'kejf'))
# print(codes['codesToWord'])

output = "["
index = 0

for word in commonWords:
    if word in codes['wordsToCode']:
        englishKeyLower = codes['wordsToCode'][word]
        englishKey = englishKeyLower.upper()
        answer = getAnswerFromEnglishKey(codes, englishKeyLower)

        if index > 0:
            output += ","

        output += " ( " + str(index) + ", { id = " + str(index) + ", target = \"" + word + "\", answer = \"" + answer + "\", englishKey = \"" + englishKey + "\" } )\n"

        # print(index, word, answer, englishKey)
    else:
        raise Exception(word + '\t' + 'not found')

    index += 1

output += "]"

outputFile = open("dataset-common.txt", "w")
outputFile.write(output)
