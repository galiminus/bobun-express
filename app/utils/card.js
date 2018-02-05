export function getCardTitle(card) {
  return (card.name.replace(/\([^\(]*$/, ''))
}

export function getCardSubtitle(card) {
  const matched = card.name.match(/\(([^\(]*)\)$/);

  return (matched ? matched[1] : null);
}
