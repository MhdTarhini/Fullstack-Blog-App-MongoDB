function Post(){
    return(
        <div className='post'>
          <div className='img'>
            <img src='https://tse3.mm.bing.net/th?id=OIP.iSu2RcCcdm78xbxNDJMJSgHaEo&pid=Api&P=0&h=180' alt=''/>
          </div>
          <div className='texts'>
            <h2>Diddy is suing the co-owner of his tequila for racial discrimination </h2>
            <p className='info'>
              <a href ='/' className='author'>David</a>
              <time>2023-05-06 16:45</time>
            </p>
            <p className='summary'>In a lawsuit, filed Wednesday, Combs said that Diageo “kneecapped DeLeons sales growth for nearly a decade” because the company considered it a “Black” brand and marketed it to only “urban customers.” The suit also alleges that Diageo also neglected marketing for Ciroc, Diddy’s vodka brand he also co-owns with the company</p>
          </div>
        </div> 
    )
}
export default Post;