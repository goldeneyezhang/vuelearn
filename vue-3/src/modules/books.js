
export default{
    state:{
        announcements:[],
        promotions:[],
        recommended:[]
    },
    getters:{
        //announcements:state=>state.announcements,
       // promotions:state=>state.promotions,
        //recommended:state=>state.recommended,
        promotionCount:state=>state.promotions.length,
        recommendedCount:state=>state.recommended.length
        }
}