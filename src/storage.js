import { AsyncStorage } from 'react-native';

export async function getActivities() {
  return AsyncStorage.getItem('@groundhog:activities')
    .then(activities => (JSON.parse(activities) || [])
        .map(({ id, title, lastAction, frequencyHours }) => {
          const activity = {
            id,
            title,
            lastAction: new Date(lastAction),
            frequencyHours,
          };
          return activity;
        })
    );
}

export async function saveActivities(activities) {
  return AsyncStorage.setItem('@groundhog:activities', JSON.stringify(activities));
}

export async function getActions() {
  return AsyncStorage.getItem('@groundhog:actions')
    .then(activities => (JSON.parse(activities) || []));
}

export async function saveAction(id, date) {
  const actions = await getActions();
  actions.push({ id, date });
  return AsyncStorage.setItem('@groundhog:actions', JSON.stringify(actions));
}

export async function clearActions() {
  return AsyncStorage.setItem('@groundhog:actions', JSON.stringify([]));
}
