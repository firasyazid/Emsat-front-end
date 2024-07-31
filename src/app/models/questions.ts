export interface MultipleChoiceData {
  options: string[];
  correctAnswer: string[];
}

export interface SingleChoiceData {
  options: string[];
  correctAnswer: string;
}

export interface DragAndDropData {
  draggableItems: string[];
  correctSequence: string[];
}

export interface TextQuestionData {
  correctAnswer: string;
}

export type QuestionType = 'multipleChoice' | 'singleChoice' | 'dragAndDrop' | 'text';

export class Question {
  id?: string;
  type: QuestionType;
  text: string;
  multipleChoiceData?: MultipleChoiceData;
  singleChoiceData?: SingleChoiceData;
  dragAndDropData?: DragAndDropData;
  textQuestionData?: TextQuestionData;
  category: string;  
  name: string;
  validation : boolean = false;

  constructor(
    type: QuestionType,
    text: string,
    category: string,
    name: string,
    validation: boolean,
    multipleChoiceData?: MultipleChoiceData,
    singleChoiceData?: SingleChoiceData,
    dragAndDropData?: DragAndDropData,
    textQuestionData?: TextQuestionData,
    id?: string
  ) {
    this.type = type;
    this.text = text;
    this.category = category;
    this.name = name;
    this.multipleChoiceData = multipleChoiceData;
    this.singleChoiceData = singleChoiceData;
    this.dragAndDropData = dragAndDropData;
    this.textQuestionData = textQuestionData;
    this.id = id;
    this.validation = validation;
  }
}
