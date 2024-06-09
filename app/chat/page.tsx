const Chat = () => {
  return (

    <div className="flex flex-col h-screen">

      <div className="flex w-full px-3 py-3 border-b">
        <span>
          <img src="https://modernize-nextjs.adminmart.com/images/profile/user-1.jpg" width="40" height="40" className="rounded-full" />
        </span>
        <div className="pl-3 pt-1">
          <p className="text-gray-900 font-bold text-sm">Danu Ciptadi</p>
          <p className="text-xs">dciptadi@gmail.com</p>
        </div>
      </div>

      <div className="overflow-y-scroll flex-grow">
        <div className="flex w-full px-3 py-3">
          <span>
            <img src="https://modernize-nextjs.adminmart.com/images/profile/user-1.jpg" width="40" height="40" className="rounded-full" />
          </span>
          <div className="pl-3 pt-1">
            <p className="text-gray-900 font-bold text-sm">Danu Ciptadi</p>
            <p className="text-xs">dciptadi@gmail.com</p>
          </div>
        </div>

      </div>

    </div>

  );
};

export default Chat;