import { useState } from 'react';
import './App.css';

function Header(props) {
  console.log('props', props, props.title);
  return (
    <header>
      <h1><a href = "https://www.naver.com" onClick={(event)=> {
        event.preventDefault(); // 원래의 기능(여기서는 하이퍼링크 타고 넘어가는 기능)을 캌 중지시킨다. 링크 타고 넘어가 버리지 않고 경고창 띄워 주게
        props.onClickMode();
      }}>{props.title}</a></h1>
    </header>
  );
}

function Nav(props) {
  
  // 그럼 배열로 온 {topics}를 인쇄하려면? 미련하게 배열 인덱스만큼 print문을 쓸 순 없잖아, for문을 돌려야 한다.
  // 안타깝괴도 for문은 return 바깥에서 돌려야 해서 좀 귀찮아진다;;
  // for문 돌려서 배열 푼 다음 다른 배열에 집어넣고, 그걸 return 안에서 열어야 한다. 😩

  const list = []

  for (let i =0; i < props.topics.length ; i++) { // 배열이 초;조;증인 건 똑같디.
   
    let dto = props.topics[i];

    // React 문법 ㅈㄴ;; 캌, 시붏알, 네가 프런트엔드를 매입했냐고. (막상 내가 뭐 만들 땐 Github Copilot 쓰거나 인터넷에서 코드 복붙할듯;;)
    list.push(<li key = {dto.id}><a id = {dto.id} href={'/'+dto.id} onClick = {(event)=>{
      event.preventDefault();
      props.onClickMode(Number(event.target.id));
    }}>{dto.title}</a></li>)
  }
  
  return(
    <nav>
      <ol>

        {list}

        {/* props로 처리하기 전엔 이거였다.
        <li><a href='/'>html</a></li>
        <li><a href='/'>css</a></li>
        <li><a href='/'>js</a></li> */}

      </ol>
    </nav>
  );
}

function Article(props) {
  console.log('props', props, props.title);
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

// function Hello(props) {
//   return (
//     <div>
//       <h2>실종 사건이 난무하는 <i>더스크우드</i>로 놀러오세요~~~</h2>

//       안녕하세요 저는 {props.jisu}입니다
//       취미는 {props.hobby}입니다, ㅋ.
//     </div>
//   );
// }

function App() {

  // mode 얘는 클릭함에 따라 바뀌어야 하는 값이다. State로 "잘" 만들어 보자... ㅋ (어려워, 하하)
  // 이렇게 [mode, setMode] 표현하면 mode는 변수로, setMode는 얘를 바꿔 주는 함수로 알아서 잘 만들어진다.
  const [mode, setMode] = useState("Welcome"); 
  const [id, setId] = useState(null); // (잘 모르겠지만, ㅋ) mode 말고 id에 대해서도 State를 설정해야 한다 말하심.

  const topics = [
    {id:1, title:"html", body:"Time for HTML"},
    {id:2, title:"css", body:"Time for CSS"},
    {id:3, title:"js", body:"Time for JavaScript"}
  ]
  
  let content = null;

  if (mode === "Welcome") { // 어. ==라고 알고 있었던 놈을 ===라고 써야 돼 😩
    content = <Article title = "Welcome!" body = "React 오알 죽음"></Article>
  } else if (mode === "Read") {

    let title, body = null;

    for(let i=0; i < topics.length; i++) {
      console.log(topics[i].id, id);
      if(topics[i].id === id) {
        title = topics[i].title;   
        body = topics[i].body;
      }
    }

    content = <Article title = {title} body = {body}></Article>

  } else if (mode === "Welcome1") {
    content = <Article title = "React!!!" body = "자는 건 알겠는데 코는 제발 안 골면 안 되냐"></Article>
  }

  return (
    <div>
      {/*여기 이 대문자로 시작하는 Header는 헤더 태그가 아니라, 위에서 만든 Header 객체다. */}

      <Header title = "REACT!!!" onClickMode = {()=> {setMode("Welcome");}}></Header> 
      
      <Nav topics = {topics} onClickMode = {(id)=> {
        setMode("Read");
        setId(id) // 생리하는데 State도 배우고 이중난관... "왜 여기에 setId가 있어야 하나요?" (방금 자세하게 설명해 주셨는데 이해못함, ㅋ)
      }}>
      </Nav>

      {content}

      <hr></hr>
      {/* <Hello jisu="깜찍이" hobby = "게임"></Hello>
      <Hello jisu="스프링" hobby = "서버 에러 내서 킹받게하기"></Hello> */}

    </div>
  );
}

export default App;


