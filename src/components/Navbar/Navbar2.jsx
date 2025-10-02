import React from "react";

export const Navbar2 = () => {
  return (
    <>
      <div className="px-20 py-10">
        <div className="h-20% w-full bg-gray-300 border-2 rounded-4xl">
          <header class="text-gray-600 body-font">
            <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
              <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <span class="mx-9 text-5xl">Your name</span>
              </a>
              <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
                <a class="mx-10 hover:text-gray-900 text-2xl">About me</a>
                <a class="mx-10 hover:text-gray-900 text-2xl">Skills</a>
                <a class="mx-10 hover:text-gray-900 text-2xl">Projects</a>
                <a class="mx-10 hover:text-gray-900 text-2xl">Contacts</a>
              </nav>
            </div>
          </header>
        </div>
      </div>
    </>
  );
};
