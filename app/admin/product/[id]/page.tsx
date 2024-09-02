import Display from './Display';
const Dynamic = ({ params}: any) => {
  const { id } = params;
 return (
    <Display 
      id={id} 
    />
  );
}

export default Dynamic;