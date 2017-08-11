import {
  createQuiz,
  updateQuizMainData,
  createQuizElement,
  createQuizElementOption,
  updateQuizElementTitle,
  updateQuizElementOption,
  fetchQuizById,
  fetchQuizResults
} from './QuizServer';


export class QuizElementOption{
  constructor(id='', text='', score=0){
    this.id = id;
    this.text = text;
    this.score = score;
  }

  static createDefaultElementOption(quizId, elementId){
    const defaultTitle = 'Option title here';
    const defaultScore = 0;
    const key = createQuizElementOption(quizId, elementId, {title:defaultTitle, score:defaultScore});
    return {id:key, title:defaultTitle, score:defaultScore};
  }

  static updateElementOptionData(quizId, elementId, id, title, score){
    updateQuizElementOption(quizId, elementId, id, {title:title, score:score})
  }
}

/**
 * Create only with parentId param!
 */
export class QuizElement{
  /*
  constructor(parentId, id='', title='', elementOptions=[]){
    this.parentId = parentId;

    this.id = id;
    this.title = title;
    this.elementOptions = elementOptions;
    if(elementOptions.length === 0){
      this.elementOptions.push(new QuizElementOption());
    }
    this.elementOptions = elementOptions;
  }

  saveTitle(){
    return saveQuizElementTitle(this.parentId, this.id, this.title);
  }

  updateOption(option){

  }
*/
  static createDefaultQuizElement(quizId){
    const defaultElementTitle = 'Untitled element';
    const elementId = createQuizElement(quizId, {title:defaultElementTitle});
    const elOption = QuizElementOption.createDefaultElementOption(quizId, elementId);
    return {id:elementId, title:defaultElementTitle, elementOptions:[elOption]};
  }

  static updateQuizElementTitle(quizId, id, title){
    return updateQuizElementTitle(quizId, id, {title:title});
  }
}

/**
 * If called with no Id, then assume that the object is not on the server. Thus create one there.
 * Else if id is present, but title, subtitle and element empty, assume want to fetch data from server by the main id
 * Else assume update in mind but don't sync yet (wait till sync called implicitly)
 */
export class Quiz{
  /*
  constructor(id='', title='', subtitle='', elements=[]){
    if(id===''){
      console.log("Quiz::constructor called without id - will create record");
      this.id = createQuiz();
      if(elements.length === 0){
          this.elements = elements;
          this.title = title;
          this.subtitle = subtitle;
          this.elements.push( new QuizElement(this.id) );//pass the parentId
        }
    }else{
      this.id = id;
      if(title==='' && subtitle==='' && elements.length===0){
        //fetch data from server
      }else{
        this.title = title;
        this.subtitle = subtitle;
        this.elements = elements;
      }
    }
    
    console.log("Quiz::constructor: " + this.id + ' ' + this.title + ' ' + this.subtitle);
  }
*/

  static createDefaultQuiz(){
    const defaultTitle= 'Untitled';
    const defaultSubTitle= '';
    const quizId = createQuiz({title:defaultTitle, subTitle:''});
    const element = QuizElement.createDefaultQuizElement(quizId);
    return {id:quizId, title:defaultTitle, subTitle:defaultSubTitle, elements:[element]};
  }

  static updateQuizTitleAndSubtitleWithData(quizId, title, subTitle){
    return updateQuizMainData(quizId, {title:title, subTitle:subTitle});
  }

  static fetchQuizWithId(id){
    return fetchQuizById(id).then(function(val){
      const quiz = val;
      let elements = [];
      for(const k in quiz.elements){
        const element = quiz.elements[k];

        let choices = [];
        for(const j in element.choices){
          const choice = element.choices[j];
          choices.push({id:j, score:choice.score, title:choice.title});
        }

        elements.push(
          {
            id:k,
            elementOptions:choices,
            title:element.title.title
          }
        );
      }
      let newQuiz = {id:id, elements:elements, title:quiz.main.title, subTitle:quiz.main.subTitle, lastModified:quiz.main.lastModified};
      return newQuiz
    });
  }

  static fetchQuizResults(quizId){
    return fetchQuizResults(quizId);
  }
}