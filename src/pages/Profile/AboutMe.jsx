import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/userSlice";
import { apiAuth } from "../../services/api";

const AboutMe = ({ aboutUser }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editableFacts, setEditableFacts] = useState(aboutUser);
  const [tempFacts, setTempFacts] = useState([...aboutUser]);

  const handleStartEditing = () => {
    setIsEditing(true);
    setTempFacts([...editableFacts]);
  };

  const handleFactChange = (index, value) => {
    const updatedFacts = [...tempFacts];
    updatedFacts[index] = value;
    setTempFacts(updatedFacts);
  };

  const handleAddFact = () => {
    setTempFacts([...tempFacts, ""]);
  };

  const handleRemoveFact = (index) => {
    const updatedFacts = tempFacts.filter((_, i) => i !== index);
    setTempFacts(updatedFacts);
  };

  const handleSave = async () => {
    // Filter out empty facts
    const factsToSave = tempFacts.filter(fact => fact.trim() !== "");
    
    try {
      const response = await apiAuth.patch("/api/reader/account/about", { about: factsToSave });
      setEditableFacts(factsToSave);
      setIsEditing(false);
      dispatch(updateUser(response.data.data));
    } catch (error) {
      console.error('Failed to update facts:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempFacts([...editableFacts]);
  };

  return (
    <div className="w-full min-h-1/2 flex flex-col bg-white p-4 sm:p-5 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 flex flex-row items-center gap-2 sm:gap-3">
          <div>About Me</div>
          <img src="/images/info.png" alt="info about me" className="w-8 h-8 sm:w-12 sm:h-12" />
        </h2>
        
        {!isEditing ? (
          <button 
            onClick={handleStartEditing} 
            className="cursor-pointer px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            ✏️ Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={handleCancel} 
              className="cursor-pointer px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave} 
              className="cursor-pointer px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save
            </button>
          </div>
        )}
      </div>

      <ul className="text-sm sm:text-base mb-4">
        {isEditing ? (
          tempFacts.map((fact, index) => (
            <li key={index} className="flex items-center mb-2">
              <span className="mr-2">-</span>
              <input
                type="text"
                value={fact}
                onChange={(e) => handleFactChange(index, e.target.value)}
                className="flex-grow border-b-2 border-blue-500 focus:outline-none"
              />
              <button 
                onClick={() => handleRemoveFact(index)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                ✕
              </button>
            </li>
          ))
        ) : (
          editableFacts.map((fact, index) => (
            <li key={index} className="font-normal text-base sm:text-xl mb-1 sm:mb-2">
              - {fact}
            </li>
          ))
        )}
      </ul>
      
      {isEditing && (
        <button 
          onClick={handleAddFact} 
          className="cursor-pointer self-start px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Add Fact
        </button>
      )}
    </div>
  );
};

export default AboutMe;