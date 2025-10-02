import React from "react";

export const Navbar3 = () => {
  return (
    <>
      <header class="bg-amber-300 text-gray-600 body-font">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span class="mx-9 text-4xl">Your name</span>
          </a>
          <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <a class="mx-10 hover:text-gray-900 text-2xl">About me</a>
            <a class="mx-10 hover:text-gray-900 text-2xl">Skills</a>
            <a class="mx-10 hover:text-gray-900 text-2xl">Projects</a>
            <a class="mx-10 hover:text-gray-900 text-2xl">Contacts</a>
          </nav>
        </div>
      </header>
    </>
  );
};
