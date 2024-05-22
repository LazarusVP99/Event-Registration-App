import { PropTypes } from 'prop-types';

const HighlightText = ({ query, highlight }) => {
  const textToHighlight = query.split(new RegExp(`(${highlight})`, 'gi'));

  return (
    <span>
      {highlight
        ? textToHighlight.map((part, index) =>
            part.toLowerCase() === highlight ? (
              <mark
                className='bg-green-500/50'
                key={index}
              >
                {part}
              </mark>
            ) : (
              part
            )
          )
        : query}
    </span>
  );
};

HighlightText.propTypes = {
  query: PropTypes.string.isRequired,
  highlight: PropTypes.string.isRequired,
};

export default HighlightText;
