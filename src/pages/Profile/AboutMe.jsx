const AboutMe = ({ aboutUser }) => {
  return (
    <div className="w-full min-h-1/2 flex flex-col bg-white p-4 sm:p-5 rounded-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 flex flex-row items-center gap-2 sm:gap-3 mb-4">
        <div>About Me</div>
        <img src="/images/info.png" alt="info about me" className="w-8 h-8 sm:w-12 sm:h-12" />
      </h2>

      <ul className="text-sm sm:text-base">
        {aboutUser.map((fact, index) => (
          <li key={index} className="font-normal text-base sm:text-xl mb-1 sm:mb-2" >- {fact}</li>
        ))}
      </ul>
    </div>
  );
}
export default AboutMe;