const fetchUrls = [
    {
        "url": "https://www.eventbrite.com/api/v3/destination/events/",
        "params": {
            "event_ids": "935156587527,965361009767,948277121397,935104682277,974388009767,998177023347,944711917777,935133398167,1015709964847,952824051387,943026897837,935150378957,1002520875927,919494852857,1002567003897,1000338548527,921121407927,948158165597,911417713917,769783020737",
            "page_size": 20,
            "expand": "event_sales_status,image,primary_venue,saves,ticket_availability,primary_organizer,public_collections"
        }
    },
    {
        "url": "https://www.eventbrite.com/api/v3/destination/events/",
        "params": {
            "event_ids": "873165099317,980413833167,1024590717417,894747332357,1013915658027,873691674317,986182326887,949590178787,918599885987,873693259057,1007303761667,984147330157,999812906317,1029039463737,953966528567,923128631587,1016848129127,861670679197,995605401557,1039070847877",
            "page_size": 20,
            "expand": "event_sales_status,image,primary_venue,saves,ticket_availability,primary_organizer,public_collections",
        }
    }
];
export default fetchUrls;
