
/**/// ########################################################################
// encoder function per request of the Candidate Exercise
function encoder(str)
{
  // Strip all other characters:  
  const regex = /[\W\s]/gi;
  str = str.toLowerCase().replace(regex, '');

  // Define Columns and Row sizes from square root:
  let C = Math.round(Math.sqrt(str.length));
  let R = C;

  // We might need an extra column to accomodate due to rounding:
  if((C*R) < str.length) C++;
  
  // split result into chunks and then into rows:
  let chunk = '';
  const rows = [];

  for(let ir=0; ir< R; ir++) // iterate rows
  {
    chunk = '';
    for(let ic=0; ic< C; ic++) // iterate columns
    {
      let idx = (ic * R) + ir;
      if(idx < str.length)
      {
        chunk += str[idx];
      } else {
        chunk += ' ';
      }
    }
    rows.push(chunk);

    // uncomment for debug:
    // console.log(`Chunk: ${chunk}`);
  }
  
  // uncomment for debug:
  // console.log(`Rows: ${rows}`);
  return rows;
}

/**///#########################################################################
module.exports = encoder;
