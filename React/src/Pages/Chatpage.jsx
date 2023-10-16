import './style.css';
import { DragHandleIcon, Search2Icon } from '@chakra-ui/icons';

const ChatPage = () => {
  const design = (
    <div className="box">
      <div className="header">
        <div className="logo-icon-section">
          <div className="logo">
            <img src="" alt="talk-grid" />
            <h1>Talk Grid</h1>
          </div>
          <div className="icon">
            <p className="search">
              {/* {search icon here} */}
              < Search2Icon />

            </p>
            <p className="there-dots">
              {/* {there dots icone here} */}
              <DragHandleIcon />
            </p>
          </div>
        </div>
        <div className="tab">
          <div className="department-tab">
            {/* department tab here */}
            <h1>department tab</h1>
          </div>
          <div className="other-tab">
            {/* other tab here */}
            <h1>department tab</h1>
          </div>
        </div>
      </div>
    </div>
  );
  return design
};

export default ChatPage;
