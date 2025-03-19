let videoLog = document.querySelector("#videoLog")  // esme video save hongi
let inputText = document.querySelector("#inputText") //input baar
let searchButton = document.querySelector("#searchButton") //search buttton


// inputText.addEventListener("input", function(event){
//     let inputValue = event.target.value
//     if(inputValue.trim() === ""){
//         getVideos()
//     }
//     else{
//         getVideos(inputValue)
//     }

// })

const videosTitle = [] //yha har ek video ke title aayenge
const allCards = [] //esme pure cards save hone
function getVideos(inputValue = null){
    videoLog.innerHTML = ""
    fetch("https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=200")
    .then(Response => Response.json())
    .then(value => {
        value.data.data.map((item , index) => {
            let videoId = item.items.id 
            let title = item.items.snippet.title
            let channelTitle = item.items.snippet.channelTitle
            videosTitle.push(title); //title push hoga har baar
            let thumbnailUrl = item.items.snippet.thumbnails.high.url
            let viewCount = item.items.statistics.viewCount


            if(inputValue && !title.toLowerCase().includes(inputValue.toLowerCase())){
                return
            }
            
            let carditem = createCard(title,channelTitle,thumbnailUrl,viewCount)
            carditem.addEventListener('click', function(){
                console.log('click to hua');
                
                window.open(`https://www.youtube.com/watch?v=${videoId}`)
            })
            allCards.push(carditem)  //yha card push ho rha hai
            // console.log(carditem)
            videoLog.appendChild(carditem)
            // console.log(item.items.statistics.viewCount);
            // console.log(thumbnailUrl);
            // console.log(channelTitle);
            // console.log(videoId);
            // console.log(title);
            
        })
    })
}

console.log(videosTitle)
console.log(allCards)

searchButton.addEventListener("click", function(){
    videoLog.innerHTML = ""
    let inputValue = inputText.value
    if(inputValue.trim() === ""){
        allCards.map((item, index) => {
            videoLog.appendChild(item)
        }) 
    }
    else{
        // videoLog.innerHTML = ""
        videosTitle.map((item, index) => {
            if(item.toLowerCase().includes(inputValue.toLowerCase())){
                videoLog.appendChild(allCards[index])
            }
        }) 
    }
    
})

function createCard(title,channelTitle,thumbnailUrl,viewCount){  //yha per card bankar ye card uper return hoga
        let card = document.createElement('div')
        let thumbnailImage = document.createElement('div')
        let videoDetails = document.createElement('div')
        let headingtitle = document.createElement('h4')
        let channelTitleheading = document.createElement('h5') 
        let viewCountheading = document.createElement("div")
        card.className = "card"
        thumbnailImage.className = "thubnailimage"
        thumbnailImage.style.backgroundImage = `url(${thumbnailUrl})`
        // console.log(thumbnailUrl)
        card.appendChild(thumbnailImage)


        videoDetails.className = "videoDetails"

        headingtitle.className = "videoTitle"
        headingtitle.textContent = title

        channelTitleheading.className = "channelTitle"
        channelTitleheading.textContent = channelTitle

        videoDetails.appendChild(headingtitle)

        videoDetails.appendChild(channelTitleheading)

        card.appendChild(videoDetails)
        viewCountheading.className = "Views"
        viewCountheading.textContent = `${viewCount > 999 ? (viewCount/100).toFixed(1) : viewCount}k views`

        videoDetails.appendChild(viewCountheading)

        return card  // ye card niche jaisa hai vaisa hi inspiration ke liye comment kar rha hai 

    // <div id="card">
    //             <div id="thubnailimage" style="background-image: url('https://i.ytimg.com/vi/75hqPk6pq5g/hqdefault.jpg');"></div>
    //             <div id="videoDetails">
    //                 <h4 id="videoTitle">Flutter Windows Installation</h4>
    //                 <h5 id="channelTitle">Hitesh Choudhary</h5>
    //                 <div id="Views">2.9k views</div>
    //             </div>
    //         </div>
}

getVideos()