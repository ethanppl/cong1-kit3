# 倉頡 (Cong1 Kit3) 輸入法練習

A minimal 倉頡 (Cong1 Kit3 or CangJie) input method practice. Check it out here: https://ethanppl.github.io/cong1-kit3/

- I built this just because different online practice I found contains ads that I don't like
- I just want a simple, minimal layout
- I started with adding event listeners for keypress, which already works for me
- Then I thought maybe I can try creating a virtual keyboard for mobile as well

This page currently only contains the most common 3000 words. Data came from here:

- [CNS11643 中文標準交換碼全字庫網站](https://www.cns11643.gov.tw/)
- [ibus-table-cangjie](https://github.com/acevery/ibus-table-cangjie/)

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
