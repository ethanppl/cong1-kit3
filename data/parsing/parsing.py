def getCNSToUnicode():
    cnsToUnicode = {}
    cnsToUnicodeFile = open('../open_data/MapingTables/Unicode/CNS2UNICODE_Unicode BMP.txt', 'r', encoding='utf-8')
    Lines = cnsToUnicodeFile.readlines()

    for line in Lines:
        splittedLine = line.strip().split('\t')
        cns = splittedLine[0]
        word = "\\u{}".format(splittedLine[1]).encode('ascii').decode('unicode-escape')

        cnsToUnicode[cns] = word

    return cnsToUnicode

def getCNSToCongKit():
    cndToCongKit = {}
    cndToCongKitFile = open('../open_data/Properties/CNS_cangjie.txt', 'r', encoding='utf-8')
    Lines = cndToCongKitFile.readlines()

    for line in Lines:
        splittedLine = line.strip().split('\t')
        cns = splittedLine[0]
        englishKey = splittedLine[1]

        cndToCongKit[cns] = englishKey

    return cndToCongKit

def getWordToCNS(cnsToUnicode):
    wordToCNS = {}

    for cns in cnsToUnicode:
        wordToCNS[cnsToUnicode[cns]] = cns

    return wordToCNS


def getAnswerFromEnglishKey(englishKey):
    englishKeyToAnswer = { 'A': '日', 'B': '月', 'C': '金', 'D': '木', 'E': '水', 'F': '火', 'G': '土', 'H': '竹', 'I': '戈', 'J': '十', 'K': '大', 'L': '中', 'M': '一', 'N': '弓', 'O': '人', 'P': '心', 'Q': '手', 'R': '口', 'S': '尸', 'T': '廿', 'U': '山', 'V': '女', 'W': '田', 'X': '難', 'Y': '卜', 'Z': '重'}

    answer = ""
    for char in englishKey:
        if char in englishKeyToAnswer:
            answer += englishKeyToAnswer[char]

    return answer

def getWordFromCNS(cnsToUnicode, cns):
    if cns in cnsToUnicode:
        return cnsToUnicode[cns]
    else:
        return None

def getCNSFromWord(wordToCNS, word):
    if word in wordToCNS:
        return wordToCNS[word]
    else:
        return None


def getCongKitFromCNS(cnsToCongKit, cns):
    if cns in cnsToCongKit:
        return cnsToCongKit[cns]
    else:
        return None

cnsToUnicode = getCNSToUnicode()
cnsToCongKit = getCNSToCongKit()

# print(getWordFromCNS('2-4828'))
# print(getCongKitFromCNS('2-4828'))
# print(getAnswerFromEnglishKey(getCongKitFromCNS('2-4828')))
    
index = 0
outputAll = "["

for cns in cnsToCongKit:
    congKit = getCongKitFromCNS(cnsToCongKit, cns)
    word = getWordFromCNS(cnsToUnicode, cns)
    answer = getAnswerFromEnglishKey(congKit)

    # ignoring index 0 because it's U+3007
    if word != None and answer != None and index > 0:
        if index > 1:
            outputAll += ","
        outputAll += " (" + str(index) + ", {id = " + str(index) + ", target = \"" + word + "\", answer = \"" + answer + "\", englishKey = \"" + congKit + "\"})\n"

        index += 1

    if index == 0:
        index += 1

outputAll += "]"

outputAllFile = open("dataset-all.txt", "w")
outputAllFile.write(outputAll)

def getCommonWords():
    commonWords = []
    commonWordsFile = open('../common_words/common_words.txt', 'r', encoding='utf-8')
    Lines = commonWordsFile.readlines()

    for line in Lines:
        splittedLine = line.strip().split('\t')
        if len(splittedLine) > 2:
            commonWords.append(splittedLine[2])

    return commonWords

commonWords = getCommonWords()
wordToCNS = getWordToCNS(cnsToUnicode)

indexCommon = 0
outputCommon = "["

for word in commonWords:
    cns = getCNSFromWord(wordToCNS, word)
    congKit = getCongKitFromCNS(cnsToCongKit, cns)
    answer = getAnswerFromEnglishKey(congKit)

    if cns != None and answer != None:
        if indexCommon > 0:
            outputCommon += ","
        outputCommon += " (" + str(indexCommon) + ", {id = " + str(indexCommon) + ", target = \"" + word + "\", answer = \"" + answer + "\", englishKey = \"" + congKit + "\"})\n"

        indexCommon += 1

outputCommon += "]"

outputCommonFile = open("dataset-common.txt", "w")
outputCommonFile.write(outputCommon)
