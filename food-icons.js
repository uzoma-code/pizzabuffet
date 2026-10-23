/**
 * Cute cartoon SVG icons for Pizza Buffet ingredients
 */
const FOOD_ICONS = {
  'classic-flour': `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="32" cy="34" r="22" fill="#F5DEB3" stroke="#D4A574" stroke-width="2"/><ellipse cx="32" cy="28" rx="18" ry="8" fill="#FFF8E7"/><circle cx="24" cy="38" r="2" fill="#E8D5B0"/><circle cx="36" cy="42" r="1.5" fill="#E8D5B0"/><path d="M20 22 Q32 14 44 22" fill="none" stroke="#D4A574" stroke-width="2" stroke-linecap="round"/></svg>`,

  'gluten-free': `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="32" cy="34" r="22" fill="#E8F5E9" stroke="#81C784" stroke-width="2"/><ellipse cx="32" cy="28" rx="18" ry="8" fill="#C8E6C9"/><path d="M26 18 L28 24 M38 18 L36 24" stroke="#66BB6A" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="38" r="2" fill="#A5D6A7"/><circle cx="40" cy="40" r="1.5" fill="#A5D6A7"/></svg>`,

  both: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="22" cy="34" r="16" fill="#F5DEB3" stroke="#D4A574" stroke-width="1.5"/><circle cx="42" cy="34" r="16" fill="#E8F5E9" stroke="#81C784" stroke-width="1.5"/><text x="32" y="38" text-anchor="middle" font-size="14" fill="#e05580">+</text></svg>`,

  mozzarella: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="14" y="20" width="36" height="28" rx="6" fill="#FFF9E6" stroke="#F0D78C" stroke-width="2"/><ellipse cx="32" cy="34" rx="14" ry="10" fill="#FFFBF0"/><circle cx="26" cy="32" r="3" fill="#FFE082"/><circle cx="38" cy="36" r="2.5" fill="#FFE082"/><circle cx="32" cy="28" r="2" fill="#FFE082"/></svg>`,

  cheddar: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M16 44 L16 24 L48 20 L48 44 Z" fill="#FFB74D" stroke="#F57C00" stroke-width="2"/><circle cx="24" cy="32" r="3" fill="#FF9800" opacity="0.5"/><circle cx="36" cy="28" r="2.5" fill="#FF9800" opacity="0.5"/><circle cx="40" cy="38" r="2" fill="#FF9800" opacity="0.5"/></svg>`,

  parmesan: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="32" cy="36" rx="20" ry="14" fill="#FFF8E1" stroke="#FFD54F" stroke-width="2"/><path d="M18 30 Q32 22 46 30" fill="none" stroke="#FFE082" stroke-width="2"/><circle cx="28" cy="38" r="1.5" fill="#FFD54F"/><circle cx="36" cy="40" r="1" fill="#FFD54F"/><circle cx="32" cy="34" r="1.2" fill="#FFD54F"/></svg>`,

  ricotta: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="32" cy="38" rx="22" ry="14" fill="#FAFAFA" stroke="#E0E0E0" stroke-width="2"/><ellipse cx="32" cy="34" rx="16" ry="8" fill="#FFFFFF"/><path d="M20 32 Q32 26 44 32" fill="none" stroke="#EEEEEE" stroke-width="2"/></svg>`,

  sausage: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="32" cy="32" rx="24" ry="10" fill="#D84315" stroke="#BF360C" stroke-width="2" transform="rotate(-15 32 32)"/><ellipse cx="32" cy="32" rx="20" ry="7" fill="#E64A19" transform="rotate(-15 32 32)"/><circle cx="24" cy="30" r="2" fill="#BF360C" transform="rotate(-15 32 32)"/><circle cx="32" cy="28" r="2" fill="#BF360C" transform="rotate(-15 32 32)"/><circle cx="40" cy="34" r="2" fill="#BF360C" transform="rotate(-15 32 32)"/></svg>`,

  pepperoni: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="32" cy="32" r="20" fill="#C62828" stroke="#B71C1C" stroke-width="2"/><circle cx="32" cy="32" r="14" fill="#D32F2F"/><circle cx="26" cy="28" r="2" fill="#FFCDD2" opacity="0.6"/><circle cx="38" cy="34" r="1.5" fill="#FFCDD2" opacity="0.6"/><circle cx="30" cy="38" r="1.5" fill="#FFCDD2" opacity="0.6"/></svg>`,

  onions: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="32" cy="38" rx="18" ry="16" fill="#F3E5F5" stroke="#CE93D8" stroke-width="2"/><path d="M32 14 Q28 24 32 38 Q36 24 32 14" fill="#E1BEE7" stroke="#BA68C8" stroke-width="1.5"/><path d="M32 14 L32 38" stroke="#BA68C8" stroke-width="1"/></svg>`,

  olives: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="28" cy="32" rx="10" ry="14" fill="#37474F" stroke="#263238" stroke-width="2" transform="rotate(-20 28 32)"/><ellipse cx="28" cy="32" rx="5" ry="8" fill="#546E7A" transform="rotate(-20 28 32)"/><ellipse cx="40" cy="36" rx="10" ry="14" fill="#37474F" stroke="#263238" stroke-width="2" transform="rotate(15 40 36)"/><ellipse cx="40" cy="36" rx="5" ry="8" fill="#546E7A" transform="rotate(15 40 36)"/></svg>`,

  'green-bell-pepper': `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M32 12 L22 28 L20 48 Q32 54 44 48 L42 28 Z" fill="#66BB6A" stroke="#388E3C" stroke-width="2"/><path d="M28 12 Q32 8 36 12" fill="none" stroke="#2E7D32" stroke-width="2"/><ellipse cx="32" cy="36" rx="10" ry="12" fill="#81C784" opacity="0.5"/></svg>`,

  'red-bell-pepper': `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M32 12 L22 28 L20 48 Q32 54 44 48 L42 28 Z" fill="#EF5350" stroke="#C62828" stroke-width="2"/><path d="M28 12 Q32 8 36 12" fill="none" stroke="#B71C1C" stroke-width="2"/><ellipse cx="32" cy="36" rx="10" ry="12" fill="#E57373" opacity="0.5"/></svg>`,

  bacon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 28 Q20 22 28 30 Q36 38 44 26 Q52 18 52 32 Q48 46 36 42 Q24 38 16 44 Q10 38 12 28" fill="#FFAB91" stroke="#FF7043" stroke-width="2"/><path d="M18 32 Q28 28 38 34 Q48 40 46 32" fill="none" stroke="#FF7043" stroke-width="1.5" stroke-dasharray="3 2"/></svg>`,

  ham: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="32" cy="34" rx="22" ry="16" fill="#FFCCBC" stroke="#FF8A65" stroke-width="2"/><ellipse cx="32" cy="34" rx="14" ry="10" fill="#FFAB91"/><circle cx="26" cy="32" r="2" fill="#FF7043" opacity="0.4"/><circle cx="36" cy="36" r="1.5" fill="#FF7043" opacity="0.4"/></svg>`,

  pineapple: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="32" cy="38" rx="18" ry="20" fill="#FFD54F" stroke="#FFA000" stroke-width="2"/><path d="M24 22 L28 14 L32 22 L36 12 L40 22" fill="#66BB6A" stroke="#388E3C" stroke-width="1.5"/><line x1="24" y1="32" x2="40" y2="32" stroke="#FFB300" stroke-width="1"/><line x1="22" y1="38" x2="42" y2="38" stroke="#FFB300" stroke-width="1"/><line x1="24" y1="44" x2="40" y2="44" stroke="#FFB300" stroke-width="1"/></svg>`,

  mushrooms: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="32" cy="26" rx="20" ry="14" fill="#BCAAA4" stroke="#8D6E63" stroke-width="2"/><rect x="26" y="26" width="12" height="20" rx="4" fill="#D7CCC8" stroke="#A1887F" stroke-width="1.5"/><ellipse cx="32" cy="24" rx="12" ry="6" fill="#D7CCC8" opacity="0.5"/></svg>`,

  'grilled-chicken': `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="32" cy="34" rx="20" ry="14" fill="#FFCC80" stroke="#FF9800" stroke-width="2" transform="rotate(-10 32 34)"/><path d="M18 30 L46 38" stroke="#F57C00" stroke-width="2" stroke-linecap="round"/><path d="M20 36 L44 28" stroke="#F57C00" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/><circle cx="28" cy="32" r="2" fill="#FFE0B2"/></svg>`,

  spinach: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="32" cy="36" rx="16" ry="20" fill="#81C784" stroke="#388E3C" stroke-width="2"/><path d="M32 16 Q24 28 20 40 Q32 36 32 16" fill="#66BB6A"/><path d="M32 16 Q40 28 44 40 Q32 36 32 16" fill="#4CAF50"/><path d="M32 16 L32 48" stroke="#2E7D32" stroke-width="1.5"/></svg>`,

  jalapenos: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M32 10 Q28 20 30 36 Q32 50 34 54 Q36 50 34 36 Q36 20 32 10" fill="#558B2F" stroke="#33691E" stroke-width="2"/><ellipse cx="32" cy="36" rx="6" ry="14" fill="#689F38"/><circle cx="32" cy="12" r="3" fill="#33691E"/></svg>`,

  'garlic-knots': `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="10" y="28" width="44" height="20" rx="4" fill="#D4A574" stroke="#A1887F" stroke-width="2"/><ellipse cx="22" cy="32" rx="6" ry="5" fill="#F5DEB3" stroke="#D4A574" stroke-width="1"/><ellipse cx="32" cy="32" rx="6" ry="5" fill="#F5DEB3" stroke="#D4A574" stroke-width="1"/><ellipse cx="42" cy="32" rx="6" ry="5" fill="#F5DEB3" stroke="#D4A574" stroke-width="1"/><circle cx="22" cy="32" r="2" fill="#FFF8E7"/><circle cx="32" cy="32" r="2" fill="#FFF8E7"/><circle cx="42" cy="32" r="2" fill="#FFF8E7"/></svg>`,
};

function injectFoodIcon(element, iconKey) {
  if (FOOD_ICONS[iconKey]) {
    element.innerHTML = FOOD_ICONS[iconKey];
  }
}

function initFoodIcons() {
  document.querySelectorAll('[data-food-icon]').forEach((el) => {
    injectFoodIcon(el, el.dataset.foodIcon);
  });
}
