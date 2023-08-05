module Main exposing (main)

import Browser
import Browser.Events exposing (onKeyDown, onKeyUp)
import Css exposing (..)
import Dict
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css)
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
    ( Model "" False defaultQuestion
    , generateNumber
    )



-- VIEW


view : Model -> Html Msg
view model =
    div [ css [ width (vw 100.0), height (vh 100.0), display inlineFlex, flexDirection column ] ]
        [ div [ css [ height (vh 40.0), display inlineFlex ] ]
            [ div [ css [ margin4 auto auto (px 8) auto, fontSize (px 64) ] ] [ text model.question.target ] ]
        , div [ css [ height (vh 40.0), display inlineFlex ] ]
            [ div [ css [ margin4 (px 8) auto auto auto, fontSize (px 24) ] ] [ outputBox model ] ]
        , div [ css [ height (vh 20.0), display inlineFlex, flexDirection column, fontSize (px 16), color (rgb 196 196 196) ] ]
            [ div [ css [ margin4 (px 2) auto (px 2) auto ] ] [ text "在鍵盤上輸入英文字母。Input English letters on your keyboard." ]
            , div [ css [ margin4 (px 2) auto (px 2) auto ] ] [ text "按空白鍵檢查答案。Press space to check your answer." ]
            , div [ css [ margin4 (px 2) auto (px 2) auto ] ] [ text "按問號鍵顯示答案。Press ? to show the answer." ]
            ]
        ]


outputBox : Model -> Html Msg
outputBox model =
    if model.showAnswer then
        div [] [ text <| model.question.answer ++ " (" ++ model.question.englishKey ++ ")" ]

    else
        div [] [ text model.content ]



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
