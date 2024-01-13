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

        if count < 25:
            codes['codesToWord'][splittedLine[0]] = splittedLine[1]

        if splittedLine[0] == 'x' and splittedLine[1] == '難':
            continue
        
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
