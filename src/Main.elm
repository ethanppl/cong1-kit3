module Main exposing (main)

import Browser
import Browser.Events exposing (onKeyDown, onKeyUp)
import Css exposing (..)
import Css.Media as Media exposing (only, screen, withMedia)
import Dict
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, placeholder, value, type_)
import Html.Styled.Events exposing (on, onClick, onInput)
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
    { content : String                           -- current input
    , showAnswer : Bool                          -- whether to show the answer
    , question : Question                        -- current question
    , showVirtualKeyboard : Bool                 -- whether to show the virtual keyboard
    , showSettings : Bool                        -- whether to show the settings page
    , numMaxQuestion: Int                        -- the max number of questions to have
    , numMaxQuestionInput: String                -- temp input for the max number of questions in the settings page
    , questionGenerator: Random.Generator Int    -- Random.Generator for generating random question numbers
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
    let 
        model = 
            { content = ""
            , showAnswer = False
            , question = defaultQuestion
            , showVirtualKeyboard = True
            , showSettings = False
            , numMaxQuestion = (maxQuestions + 1)
            , numMaxQuestionInput = (String.fromInt (maxQuestions + 1))
            , questionGenerator = Random.int 0 maxQuestions
            } 
    in 
    ( model
    , generateNumber model
    )



-- VIEW


view : Model -> Html Msg
view model =
    if not model.showSettings then 
        div [ css [ width (vw 100.0), minHeight (vh 100.0), display inlineFlex, flexDirection column ] ]
            [ div [ css [ minHeight (vh 20.0), display inlineFlex ] ]
                [ div [ css [ margin4 auto auto (px 8) auto, fontSize (px 64) ] ] [ text model.question.target ] ]
            , div [ css [ minHeight (vh 10.0), display inlineFlex ] ]
                [ div [ css [ margin4 auto auto (px 8) auto, fontSize (px 24) ] ] [ outputBox model ] ]
            , div [ css [ minHeight (vh 60.0), display inlineFlex ] ]
                [ div [ css [ margin4 auto auto (rem 4) auto ] ] [ virtualKeyboard model ] ]
            , div [ css [ position absolute, top (rem 1), right (rem 1) ] ]
                [ settingsBtn ]
            ]
    else 
        div [ css [ width (vw 100.0), minHeight (vh 100.0), display inlineFlex, flexDirection column ] ]
            [ div [ css [ position absolute, top (rem 1), right (rem 1) ] ]
                [ closeSettingsBtn ]
            , div [ css [ marginTop (rem 5), minHeight (vh 10.0), display inlineFlex, flexDirection column, fontSize (rem 1.25), color (rgb 196 196 196) ] ]
                [ div
                    [ css [ margin4 (px 2) auto (px 2) auto ] ]
                    [ text "在鍵盤上輸入與答案相應的英文字母。Input the corresponding English letters on your keyboard." ]
                , div
                    [ css [ margin4 (px 2) auto (px 2) auto ] ]
                    [ text "按空白鍵檢查答案。Press space to check your answer." ]
                , div
                    [ css [ margin4 (px 2) auto (px 2) auto ] ]
                    [ text "按問號鍵顯示答案。Press ? to show the answer." ]
                , div
                    [ css [ margin4 (px 2) auto (px 2) auto ] ]
                    [ text "按 Escape 鍵顯示/隠藏設定。Press Escape to show/hide the settings page." ]
                , div
                    [ css [ margin4 (px 2) auto (px 2) auto ] ]
                    [ text "按 ` 鍵顯示/隠藏鍵盤。Press ` to show/hide the keyboard." ]
                ]
            , div [ css [ marginTop (rem 5), minHeight (vh 10.0), display inlineFlex, flexDirection column, fontSize (rem 1.25) ] ]
                [ div
                    [ css [ margin4 (px 2) auto (px 2) auto, display inlineFlex, flexDirection row ] ]
                    [ div
                        [ css [ margin4 (px 2) (rem 4) (px 2) auto ] ]
                        [ text "Number of Questions: " ]
                    , div
                        [ css [ margin4 (px 2) auto (px 2) auto ] ]
                        [ input [ type_ "number", placeholder "", value model.numMaxQuestionInput, onInput MaxQuestionUpdated ] [ ] ]
                    , div
                        [ css [ margin4 (px 2) auto (px 2) (px 8), color (rgb 196 196 196) ] ]
                        [ text ("(range is 1 - " ++ (String.fromInt (maxQuestions + 1)) ++ ")")] 
                    ]
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
        [ margin (rem 0.2)
        , height (rem 4.5)
        , width (rem 4.5)
        , fontSize (px 20)
        , touchAction manipulation
        , borderRadius (rem 0.2)
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

settingsBtn : Html Msg
settingsBtn = 
    button 
        [ onClick (ToggleSettings True), css [ buttonStyle ] ]
        [ text "⚙️" ]

closeSettingsBtn : Html Msg
closeSettingsBtn = 
    button 
        [ onClick (ToggleSettings False), css [ buttonStyle ] ]
        [ text "✖" ]

-- UPDATE


type Msg
    = PressedLetter Char
    | Control String
    | LiftedLetter Char
    | NewQuestion Int
    | ToggleSettings Bool
    | MaxQuestionUpdated String
    | Ignore


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        PressedLetter ' ' ->
            if model.showSettings then
                ( model, Cmd.none )
            else
                checkAnswer model

        PressedLetter '?' ->
            if model.showSettings then
                ( model, Cmd.none )
            else
                showAnswer model

        PressedLetter '`' ->
            toggleKeyboard model

        PressedLetter char ->
            if model.showSettings then
                ( model, Cmd.none )
            else
                ( { model | content = String.append model.content <| String.fromChar char }, Cmd.none )

        Control "Backspace" ->
            ( { model | content = String.dropRight 1 model.content }, Cmd.none )

        Control "Escape" ->
            let state = not model.showSettings in
            if state then
                openSettings { model | showSettings = state }
            else
                closeSettings { model | showSettings = state }

        Control _ ->
            ( model, Cmd.none )

        LiftedLetter '?' ->
            hideAnswer model

        LiftedLetter _ ->
            ( model, Cmd.none )

        NewQuestion num ->
            getQuestion model num

        ToggleSettings state ->
            if state then
                openSettings { model | showSettings = state }
            else
                closeSettings { model | showSettings = state }

        MaxQuestionUpdated num ->
            ( { model | numMaxQuestionInput = num }, Cmd.none)

        Ignore ->
            ( model, Cmd.none )


checkAnswer : Model -> ( Model, Cmd Msg )
checkAnswer model =
    if model.content == model.question.answer then
        ( { model | content = "" }
        , generateNumber model
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
    if num /= 0 && num == model.question.id then
        ( model, generateNumber model )

    else
        case Dict.get num questions of
            Just question ->
                ( { model | question = question }, Cmd.none )

            Nothing ->
                ( model, Cmd.none )


-- generate a random number using the model's Random.Generator
generateNumber : Model -> Cmd Msg
generateNumber model =
    Random.generate NewQuestion model.questionGenerator

-- update the max number of questions
-- if the input is larger than the max number of questions, do nothing
-- else, update the max number of questions and generate a new question
numMaxQuestionUpdate : Model -> Int -> ( Model, Cmd Msg )
numMaxQuestionUpdate model num =
    if num > (maxQuestions + 1) || num < 1 then
        ( model, Cmd.none )
    else
        let 
            modelUpdated = 
                { model | numMaxQuestion = num, questionGenerator = Random.int 0 (num - 1) }
        in
        ( modelUpdated
        , generateNumber modelUpdated
        )

-- when open settings, update the input field with the current max number of questions
openSettings : Model -> ( Model, Cmd Msg)
openSettings model =
    ( { model | numMaxQuestionInput = (String.fromInt model.numMaxQuestion) }, Cmd.none)

-- when close settings, update the max number of questions with the input field
-- if failed to convert the input field to int, use the current max number of questions
closeSettings : Model -> ( Model, Cmd Msg)
closeSettings model =
    numMaxQuestionUpdate model (String.toInt model.numMaxQuestionInput |> Maybe.withDefault model.numMaxQuestion)

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
