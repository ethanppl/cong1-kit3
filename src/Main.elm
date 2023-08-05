module Main exposing (main)

import Browser
import Browser.Events exposing (onKeyDown, onKeyUp)
import Css exposing (..)
import Css.Media as Media exposing (only, screen, withMedia)
import Dict
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css)
import Html.Styled.Events exposing (on, onClick)
import Json.Decode as Decode
import Questions exposing (Question, maxQuestions, questions)
import Random



-- MAIN


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view >> toUnstyled
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


type alias Model =
    { content : String
    , showAnswer : Bool
    , question : Question
    , showVirtualKeyboard : Bool
    }


defaultQuestion : Question
defaultQuestion =
    { id = 1
    , target = "倉"
    , answer = "人戈日口"
    , englishKey = "OIAR"
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( Model "" False defaultQuestion True
    , generateNumber
    )



-- VIEW


view : Model -> Html Msg
view model =
    div [ css [ width (vw 100.0), minHeight (vh 100.0), display inlineFlex, flexDirection column ] ]
        [ div [ css [ minHeight (vh 20.0), display inlineFlex ] ]
            [ div [ css [ margin4 auto auto (px 8) auto, fontSize (px 64) ] ] [ text model.question.target ] ]
        , div [ css [ minHeight (vh 10.0), display inlineFlex ] ]
            [ div [ css [ margin4 auto auto (px 8) auto, fontSize (px 24) ] ] [ outputBox model ] ]
        , div [ css [ minHeight (vh 60.0), display inlineFlex ] ]
            [ div [ css [ margin4 auto auto (rem 4) auto ] ] [ virtualKeyboard model ] ]
        , div [ css [ minHeight (vh 10.0), display inlineFlex, flexDirection column, fontSize (px 16), color (rgb 196 196 196) ] ]
            [ div
                [ css [ margin4 (px 2) auto (px 2) auto ] ]
                [ text "在鍵盤上輸入與答案相應的英文字母。Input the corresponding English letters on your keyboard." ]
            , div
                [ css [ margin4 (px 2) auto (px 2) auto ] ]
                [ text "按空白鍵檢查答案。Press space to check your answer." ]
            , div
                [ css [ margin4 (px 2) auto (px 2) auto ] ]
                [ text "按問號鍵顯示答案。Press ? to show the answer." ]
            ]
        ]


outputBox : Model -> Html Msg
outputBox model =
    if model.showAnswer then
        div [] [ text <| model.question.answer ++ " (" ++ model.question.englishKey ++ ")" ]

    else
        div [] [ text model.content ]


virtualKeyboard : Model -> Html Msg
virtualKeyboard model =
    if model.showVirtualKeyboard then
        div [ css [ display inlineFlex, flexDirection column, alignItems center ] ]
            [ div []
                [ virtualKeyboardBtn '手'
                , virtualKeyboardBtn '田'
                , virtualKeyboardBtn '水'
                , virtualKeyboardBtn '口'
                , virtualKeyboardBtn '廿'
                , virtualKeyboardBtn '卜'
                , virtualKeyboardBtn '山'
                , virtualKeyboardBtn '戈'
                , virtualKeyboardBtn '人'
                , virtualKeyboardBtn '心'
                , virtualBackspace
                ]
            , div []
                [ virtualKeyboardBtn '日'
                , virtualKeyboardBtn '尸'
                , virtualKeyboardBtn '木'
                , virtualKeyboardBtn '火'
                , virtualKeyboardBtn '土'
                , virtualKeyboardBtn '竹'
                , virtualKeyboardBtn '十'
                , virtualKeyboardBtn '大'
                , virtualKeyboardBtn '中'
                ]
            , div []
                [ virtualKeyboardBtn '重'
                , virtualKeyboardBtn '難'
                , virtualKeyboardBtn '金'
                , virtualKeyboardBtn '女'
                , virtualKeyboardBtn '月'
                , virtualKeyboardBtn '弓'
                , virtualKeyboardBtn '一'
                , virtualQuestionMark
                ]
            , div [] [ virtualSpace ]
            ]

    else
        div [] []


buttonStyle : Style
buttonStyle =
    Css.batch
        [ margin (px 4)
        , height (rem 5)
        , width (rem 5)
        , fontSize (px 20)
        , touchAction manipulation
        ]


virtualKeyboardBtn : Char -> Html Msg
virtualKeyboardBtn char =
    button
        [ onClick (PressedLetter char)
        , css [ buttonStyle ]
        ]
        [ text <| String.fromChar char ]


virtualBackspace : Html Msg
virtualBackspace =
    button
        [ onClick (Control "Backspace")
        , css [ buttonStyle ]
        ]
        [ text "←" ]


virtualSpace : Html Msg
virtualSpace =
    button
        [ onClick (PressedLetter ' ')
        , css [ buttonStyle, width (rem 20) ]
        ]
        [ text "Space" ]


virtualQuestionMark : Html Msg
virtualQuestionMark =
    button
        [ on "pointerdown" <| Decode.succeed <| PressedLetter '?'
        , on "pointerup" <| Decode.succeed <| LiftedLetter '?'
        , css [ buttonStyle ]
        ]
        [ text "？" ]



-- UPDATE


type Msg
    = PressedLetter Char
    | Control String
    | LiftedLetter Char
    | NewQuestion Int
    | Ignore


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        PressedLetter ' ' ->
            checkAnswer model

        PressedLetter '?' ->
            showAnswer model

        PressedLetter '`' ->
            toggleKeyboard model

        PressedLetter char ->
            ( { model | content = String.append model.content <| String.fromChar char }, Cmd.none )

        Control "Backspace" ->
            ( { model | content = String.dropRight 1 model.content }, Cmd.none )

        Control _ ->
            ( model, Cmd.none )

        LiftedLetter '?' ->
            hideAnswer model

        LiftedLetter _ ->
            ( model, Cmd.none )

        NewQuestion num ->
            getQuestion model num

        Ignore ->
            ( model, Cmd.none )


checkAnswer : Model -> ( Model, Cmd Msg )
checkAnswer model =
    if model.content == model.question.answer then
        ( { model | content = "" }
        , generateNumber
        )

    else
        ( model, Cmd.none )


showAnswer : Model -> ( Model, Cmd Msg )
showAnswer model =
    ( { model | showAnswer = True }, Cmd.none )


hideAnswer : Model -> ( Model, Cmd Msg )
hideAnswer model =
    ( { model | showAnswer = False }, Cmd.none )


toggleKeyboard : Model -> ( Model, Cmd Msg )
toggleKeyboard model =
    ( { model | showVirtualKeyboard = not model.showVirtualKeyboard }, Cmd.none )


getQuestion : Model -> Int -> ( Model, Cmd Msg )
getQuestion model num =
    if num == model.question.id then
        ( model, generateNumber )

    else
        case Dict.get num questions of
            Just question ->
                ( { model | question = question }, Cmd.none )

            Nothing ->
                ( model, Cmd.none )


generateNumber : Cmd Msg
generateNumber =
    Random.generate NewQuestion (Random.int 0 maxQuestions)



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ onKeyDown keyDecoder
        , onKeyUp keyUpDecoder
        ]


keyDecoder : Decode.Decoder Msg
keyDecoder =
    Decode.map toKey (Decode.field "key" Decode.string)


keyUpDecoder : Decode.Decoder Msg
keyUpDecoder =
    Decode.map toUpKey (Decode.field "key" Decode.string)


toKey : String -> Msg
toKey string =
    case String.uncons string of
        Just ( char, "" ) ->
            PressedLetter <| mapKey <| Char.toLocaleUpper char

        _ ->
            Control string


toUpKey : String -> Msg
toUpKey string =
    case String.uncons string of
        Just ( char, "" ) ->
            LiftedLetter <| mapKey <| Char.toLocaleUpper char

        _ ->
            Ignore


mapKey : Char -> Char
mapKey char =
    case char of
        'A' ->
            '日'

        'B' ->
            '月'

        'C' ->
            '金'

        'D' ->
            '木'

        'E' ->
            '水'

        'F' ->
            '火'

        'G' ->
            '土'

        'H' ->
            '竹'

        'I' ->
            '戈'

        'J' ->
            '十'

        'K' ->
            '大'

        'L' ->
            '中'

        'M' ->
            '一'

        'N' ->
            '弓'

        'O' ->
            '人'

        'P' ->
            '心'

        'Q' ->
            '手'

        'R' ->
            '口'

        'S' ->
            '尸'

        'T' ->
            '廿'

        'U' ->
            '山'

        'V' ->
            '女'

        'W' ->
            '田'

        'X' ->
            '難'

        'Y' ->
            '卜'

        'Z' ->
            '重'

        _ ->
            char
