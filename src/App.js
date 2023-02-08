// eslint-disable-next-line
import * as React from 'react'; //리액트가 디폴트 컴포넌트니까 관련된거 다 끌고 와줘
import Select from 'react-select'; //리액트가 전용으로 사용하는 select 폼을 끌고 온 것
import { useForm , Controller} from 'react-hook-form'; // Controller 폼에 모든 태그가 다 컨트롤러로 표현이 됨 //체크박스,라디오 버튼 등 컨트롤하기 편함 //타입만 결정해주면 됨
import { Checkbox , FormControlLabel , RadioGroup , Radio } from '@material-ui/core'; //css는 이걸로 처리할거야 _css 짜기 힘든 것들 이걸로 처리 
//RadioGroup만 따로 그룹이 있는 이유는 라디오는 네임이 있어서 개발할 때 그룹으로 묶이기 떄문
//FormControlLabel form만들기에 편하게 만들어주는 것 - label들을 관리해줌 == checkbox, radio를 위해

function App() {
  const checkboxValue = ['html_css' , 'react' , 'ECMA6' , 'php'];
  const radioValue = ['파트타임' , '하루종일' , '3시간'];
    //name을 등록시켜서 register해서 보내는 게 핵심!
  const { register, handleSubmit, watch, control , formState: { errors } } = useForm(
    {  //데이터타입의 디폴트값 설정
    defaultValues: {
      company: '',
      email: '',
      select : ' { value: "chocolate", label: "Chocolate" } ', //선택하지 않았을 때 전송되는 기본값
      worktime : radioValue[0],
      checkboxdb : []
    }
});
//api는 서버와 서버끼리의 연결이라서 남의 언어를 가져와서 사용하는 것이므로 string화 시켜서 보낸다.
  const onSubmit = data => {
 //외부데이터로 전송할 것이므로 문자열화시킴(DB가 가공되지 않게끔 처리) -> Json.stringify(data)
     alert(JSON.stringify(data)) // <form onSubmit={handleSubmit(onSubmit)}> 값이 들어옴
 

  }
  return (
    <div className="App">
     <form onSubmit={handleSubmit(onSubmit)}>
   <ul>
    <li><input defaultValue="test" {...register("company" , { required : true, })} placeholder ="회사이름" />
    {/* 패턴이 없는 경우 에러메세지 출력이 안됨 _ 그러므로 아래처럼 에러메세지는 하드코딩으로 만들어주어야 한다*/}
    {errors.company && <p>회사이름을 기입해주세요</p>}</li>
    {/* required : "회사이름을 기입하세요"(string)(에러메세지 대신 역할) 또는 true,false로 값을 따로 뺴서 사용 */}
    <li> <input {...register("email" , { required: true , 
     pattern: {
      value: /\S+@\S+\.\S+/, //정규식표현
      message: "올바른 이메일 형식이 아닙니다.", //메세지
  }
    })} />
    {errors.email && <span>{errors.email.message}</span>}</li>
    <li>
      <span>셀렉트로 하나만 선택하기</span>
      <select {...register("gender" , {
        required : true , 
        message : "꼭하나 선택하기" //패턴이 있어서 에러 메세지 넣기가 용이함

      })}>
        <option value="f">여자</option>
        <option value="m">남자</option>
        <option value="o">기타</option>
      </select>
      {errors.gender && <p>{ errors.gender.message }</p>}
    </li>
    <li>
      {/* <Controller></Controller> */}
      {/* //control이란 메서드를 넣어주어야 사용이 가능함 ex. const { register, handleSubmit, watch, control , formState: { errors } } */}
      <Controller
          name="select"
          control={control}
          render={({ field }) => <Select 
          {...field} 
          options={[
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" }
          ]} 
          />}
      />
    </li>
    <li>
      <strong>checkbox만 이걸로 사용! (@material-ui /core_로 인해 css가 입혀진채 나옴)</strong>
      {/* //label이 달린 폼컨트롤러 */}
{
      checkboxValue.map((item, idx) => {

    return(

    <FormControlLabel
      control={ 
          <Checkbox                                                    
              {...register('checkboxdb') }
              value={item}
      
      />}

      label={item}
      
      />

        )
    })
  }
    </li>
    <li>
      <RadioGroup>
          {
            radioValue.map((item, idx) => {
              return(
              <FormControlLabel
                 control={ 
                   <Radio                                                   
                      {...register('worktime') }
                      value={item}
              
              />}
        
              label={item}
              
              />
              )
            })
          }
      </RadioGroup> 
      
    </li>
   </ul>
      <input type="submit" />
    </form>
    </div>
  );
}

export default App;
