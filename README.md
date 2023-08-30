# 倉頡 (Cong1 Kit3) 輸入法練習

A minimal 倉頡 (Cong1 Kit3 or CangJie) input method practice. Check it out here: https://ethanppl.github.io/cong1-kit3/

- I built this just because different online practice I found contains ads that I don't like
- I just want a simple, minimal layout
- I started with adding event listeners for keypress, which already works for me
- Then I thought maybe I can try creating a virtual keyboard for mobile as well

This page currently only contains the most common 3000 words. Data came from here:

- [CNS11643 中文標準交換碼全字庫網站](https://www.cns11643.gov.tw/)
- [常用字頻序表](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-can/faq.php)

## Getting Started

To run it:

```bash
elm reactor
```

Then visit `http://localhost:8000/src/Main.elm`

To build it:

```bash
elm make src/Main.elm
```

## Why Elm

- I thought maybe I can try Elm for this one, as someone suggested it to me
- Turns out Elm is pretty fun to use, the Elm architecture takes some time to learn, but it's worth it
- It's like the types are teaching you to architect better

## More about the data

- 此字庫的是以五代倉頡碼為基礎，例如「應」的倉頡碼是「戈人土心」，而不是「戈土心」、「拿」的倉頡碼是「人口手」，而不是「人一口手」。
- 此字庫亦有出錯的地方，例如「飯」的倉頡碼是「人戈竹水」，而不是「人戈一水」。如有發現其他錯誤，[請通知我](https://github.com/ethanppl/cong1-kit3/issues/new)

Fixed:

| Character | Wrong CangJie | Correct CangJie |
| --------- | ------------- | --------------- |
| 飯        | 人戈一水      | 人戈竹水        |
| 撲        | 手廿一人      | 手廿金人        |
| 業        | 廿一廿木      | 廿金廿木        |
| 桃        | 木竹卜人      | 木中一人        |
