var Router = require("router");
var router = Router();
const create_event = require("../../control/event/create_event")
const get_event_now = require("../../control/event/event_now")
const close_event = require("../../control/event/close_event")
const check_event = require("../../control/event/check_event")
var moment:any = require("moment-timezone");
router.post("/create", async (req: any, res: any) => {
    const { end_date, image, owner, localtion, name, start_date, catogory_id } = req.body.input;
    const check_events = await check_event({name})
    if(check_events.data.Event.length>0){
      return res.status(404).json({
        type: 2,
        message:"Tên event đã tồn tại",
        status:400,
      });
    }
  try {
    console.log("data",req.body.input)
    const data = await create_event({end_date, image, owner, localtion, name, start_date},catogory_id)
    console.log(data)
    return res.json({
        event: data.data
      })
  } catch (err) {
    console.log(err);
    res.send("Tài khoản đã tồn tại");
  }
});
router.post("/close",async (req:any,res:any)=>{
  let dateGet:any = moment(new Date())
  .tz("Asia/Bangkok")
  .format("YYYY-MM-DD HH:mm");
  const date_heroku:any = new Date(dateGet);
  console.log(dateGet, date_heroku);
  try {
    let dem=0;
    const data= await get_event_now()
    if(data.data.event_now.length>0){
      for(let i in data.data.event_now){
        const end_date:any = new Date(data.data.event_now[i].end_date)
        console.log(end_date)
        if(end_date-date_heroku<=0&&data.data.event_now[i].status==1){
          const close = await close_event({id:data.data.event_now[i].id})
          console.log("đã close",close)
          dem=dem+1
          
        }
      }
      
    }if(dem==0){
      return res.send("Đóng không thành công")
    }else{
      return res.send("Đóng thành công")
    }

  } catch (err) {
    return res.send("Đóng không thành công")
  }
  
} )
module.exports = router;