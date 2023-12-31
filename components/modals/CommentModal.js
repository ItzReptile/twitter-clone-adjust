
import { db } from "@/firebase";
import { closeCommentModal} from "@/redux/modalSlice";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import Modal from "@mui/material/Modal";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
export default function CommendModal() {
  const isOpen = useSelector((state) => state.modal.commentModalOpen);
  const userImg = useSelector((state) => state.user.photoURL);
  const user = useSelector((state) => state.user);
  const TweetDetails = useSelector((state) => state.modal.commentTweetDetails);
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const router = useRouter()


  async function sendComment() {
    const docRef = doc(db, "posts", TweetDetails.id)
    const commentDetails = {
      username: user.username,
      name: user.name,
      photoURL: user.photoURL,
      comment: comment,
    };
    await updateDoc(docRef, {
      comments: arrayUnion(commentDetails),
    })
 
    dispatch(closeCommentModal())
    router.push("/" + TweetDetails.id)
  }
  return (
    <>
      <Modal
        className="flex justify-center items-center"
        open={isOpen}
        onClose={() => dispatch(closeCommentModal())}
      >
        <div
          className="relative sm:p-10 p-4 text-white rounded-lg bg-black 
        border border-gray-500 w-full h-full sm:w-[600px] 
        sm:h-[386px]"
        >
          <div
            className="absolute w-[2px] h-[77px] bg-gray-500 
          left-[40px] top-[96px] sm:left-[64px] sm:top-[120px]"
          ></div>
          <div
            onClick={() => dispatch(closeCommentModal())}
            className="absolute top-4 cursor-pointer"
          >
            <XIcon className="w-6" />
          </div>
          <div className="mt-8">
            <div className="flex space-x-3 w-full">
              <img
                className="w-12 h-12 object-cover rounded-full"
                src={TweetDetails.photoURL}
              />
              <div>
                <div className="flex space-x-1.5">
                  <h1 className="font-bold">{TweetDetails.name}</h1>
                  <h1 className="text-gray-500">@{TweetDetails.username}</h1>
                </div>
                <p className="mt-1">{TweetDetails.tweet}</p>
                <h1 className="text-gray-500 mt-2 text-[15px]">
                  Replying to{" "}
                  <span className="text-[#1b9bf0]">
                    @{TweetDetails.username}
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <div className="mt-11">
            <div className="flex space-x-3 ">
              <img
                className="w-12 h-12 object-cover rounded-full"
                src={userImg}
              />
              <div className="w-full">
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tweet Your Reply"
                  className="outline-none text-lg w-full bg-transparent resize-none"
                />
                <div className=" border-t flex border-gray-700 pt-4 justify-between">
                  <div className="flex space-x-0">
                    <div className="iconsAnimation">
                      <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
                    </div>
                    <div className="iconsAnimation">
                      <ChartBarIcon className="h-[22px] text-[#1d9bf0]" />
                    </div>
                    <div className="iconsAnimation">
                      <EmojiHappyIcon className="h-[22px] text-[#1d9bf0]" />
                    </div>
                    <div className="iconsAnimation">
                      <CalendarIcon className="h-[22px] text-[#1d9bf0]" />
                    </div>
                    <div className="iconsAnimation">
                      <LocationMarkerIcon className="h-[22px] text-[#1d9bf0]" />
                    </div>
                  </div>
                  <button
                    onClick={sendComment}
                    disabled={!comment}
                    className="bg-[#1d9bf0] rounded-full px-4 py-1.5 disabled:opacity-50"
                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
