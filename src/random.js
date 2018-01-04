export function getRandomNumber(max)
{
  return Math.floor(Math.random()*max);
}

export function getSoldiersRowsPosition(soldiers, max)
{
  var rows = [];
  for(var i=0; i< soldiers; i++)
  {
    rows.push(getRandomNumber(max));
  }
  return rows;
}
export function getSoldiersColsPosition(soldiers, max)
{
  var cols =[];
  for(var i=0; i< soldiers; i++)
  {
    cols.push(getRandomNumber(max));
  }
  return cols;
}
