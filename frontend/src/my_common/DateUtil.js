export const formatarFromDate = data => {
  const ano = data.getFullYear();
  const mes = `00${data.getMonth() + 1}`.slice(-2);
  const dia = `00${data.getDate()}`.slice(-2);

  return `${ano}-${mes}-${dia}`;
}

export const formatarFromJsonAnoMesDia = data => {
    let soData = data.substring(0,10)
    let result = soData.split('-')
    return `${result[0]}-${result[1]}-${result[2]}`
}

export const formatarFromJsonDiaMesAno = data => {
  let soData = data.substring(0,10)
  let result = soData.split('-')
  return `${result[2]}/${result[1]}/${result[0]}`
}
