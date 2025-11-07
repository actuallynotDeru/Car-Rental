import { Star } from "lucide-react"



const CustomerReview = () => {
    return(
        <div className="border-t-2 border-b-2 flex flex-col w-auto h-[250px] gap-2.5">
            <div className="flex items-center py-2.5">
                <div className="w-[50px] h-[50px] rounded-full bg-gray-300" />
                <span className="m-3 text-[16px] font-medium">Machacon, Jian Bryce</span>
            </div>

            <div className="flex">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
            </div>

            <div>
                <p className="text-[14px]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis, officia. Fugiat officia quidem, perferendis porro optio harum magni! Optio corporis quis nesciunt placeat ducimus cupiditate hic ipsum ea, tempore est.</p>
            </div>

        </div>
    )
}

export default CustomerReview