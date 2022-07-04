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
      props.onClickMode(event.target.id);
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
      {props.title}
      <h2>실종 사건이 난무하는 <i>더스크우드</i>로 놀러오세요~~~</h2>
      {props.jilcheok}
    </article>
  );
}

// function Hello(props) {
//   return (
//     <div>
//       안녕하세요 저는 {props.jisu}입니다
//       취미는 {props.hobby}입니다, ㅋ.
//     </div>
//   );
// }

function App() {

  const topics = [
    {id:1, title:"html", body:"Time for HTML"},
    {id:2, title:"css", body:"Time for CSS"},
    {id:3, title:"js", body:"Time for JavaScript"}
  ]

  return (
    <div>
      {/*여기 이 대문자로 시작하는 Header는 헤더 태그가 아니라, 위에서 만든 Header 객체다. */}

      <Header title = "REACT!!!" onClickMode = {()=> {alert('화려한 조명이 날 감싸지 않아도 난 빛이 나')}}></Header> 
      
      
      <Nav topics = {topics} onClickMode = {(id)=> {alert(id)}}></Nav>
      {/* topics는 이렇게 전달해야 App() 안에서 지역변수로 만들었던 topics 배열을 제대로 실어 보낼 수 있다.
      (id)=> {alert(id)}는 시작할 때도 id를 인수로 실어야 한다. */}
      

      <Article title = "Welcome!" jilcheok = "Please talk back to me Jake"></Article>

      <hr></hr>
      {/* <Hello jisu="깜찍이" hobby = "게임"></Hello>
      <Hello jisu="스프링" hobby = "서버 에러 내서 킹받게하기"></Hello> */}

    </div>
  );
}

export default App;


